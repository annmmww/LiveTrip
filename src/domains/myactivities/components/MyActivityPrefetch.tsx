import MyActivitySection from '@/domains/myactivities/components/MyActivitySection';
import {
  MY_ACTIVITIES_PAGE_SIZE,
  myActivitiesQueryOptions,
} from '@/domains/myactivities/queryOptions';
import { getDehydratedInfiniteQueryClient } from '@/lib/react-query/getDehydratedInfiniteQueryClient';
import { Hydrate } from '@/lib/react-query/getQueryClient';

export default async function MyActivityPrefetch() {
  const dehydratedState = await getDehydratedInfiniteQueryClient({
    ...myActivitiesQueryOptions.all(MY_ACTIVITIES_PAGE_SIZE),
    initialPageParam: 0,
  });

  return (
    <Hydrate state={dehydratedState}>
      <MyActivitySection />
    </Hydrate>
  );
}
