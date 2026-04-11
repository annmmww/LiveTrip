import { dehydrate, type QueryKey } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/react-query/getQueryClient';

interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType>;
}

export async function getDehydratedQueryClient(queries: QueryProps[]) {
  // 캐싱된 QueryClient를 불러오기
  const queryClient = getQueryClient();

  // 모든 쿼리를 병렬로 prefetch
  await Promise.allSettled(
    queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({ queryKey, queryFn })
    )
  );

  return dehydrate(queryClient);
}
