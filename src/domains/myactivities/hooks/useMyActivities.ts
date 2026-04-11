import { useInfiniteByCursor } from '@/hooks/useInfiniteScroll';
import type { Activity, MyActivities } from '@/domains/myactivities/type';
import {
  MY_ACTIVITIES_PAGE_SIZE,
  myActivitiesQueryKeys,
} from '@/domains/myactivities/queryOptions';

export function useMyActivities() {
  const {
    items: activities,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteByCursor<MyActivities, Activity>({
    queryKey: myActivitiesQueryKeys.all(),
    initialCursor: 0,
    buildUrl: (cursor) => {
      const url =
        cursor !== 0
          ? `/my-activities?cursorId=${cursor}&size=${MY_ACTIVITIES_PAGE_SIZE}`
          : `/my-activities?size=${MY_ACTIVITIES_PAGE_SIZE}`;

      return url;
    },
    selectItems: (view) => view.activities,
    selectNextCursor: (view) => view.cursorId ?? undefined,
    selectTotalCount: (first) => first?.totalCount ?? 0,
    pageSize: MY_ACTIVITIES_PAGE_SIZE,
  });

  return {
    activities,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
}
