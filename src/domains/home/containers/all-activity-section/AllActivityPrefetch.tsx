import AllActivityDataWrapper from '@/domains/home/containers/all-activity-section/AllActivityDataWrapper';
import type { AllActivitySectionProps } from '@/domains/home/type';
import { getDehydratedInfiniteQueryClient } from '@/lib/react-query/getDehydratedInfiniteQueryClient';
import { queryOptions } from '@/domains/activities/queryOptions';
import { Hydrate } from '@/lib/react-query/getQueryClient';

export default async function AllActivityPrefetch({
  sort = 'latest',
  category,
}: AllActivitySectionProps) {
  const hydratedInfiniteActivities = await getDehydratedInfiniteQueryClient({
    ...queryOptions.all({
      sort,
      category,
      method: 'cursor',
      size: 8,
    }),
    initialPageParam: undefined,
  });
  return (
    <Hydrate state={hydratedInfiniteActivities}>
      <AllActivityDataWrapper category={category} sort={sort} />
    </Hydrate>
  );
}
