import { getMyActivities } from '@/domains/myactivities/api';

export const MY_ACTIVITIES_PAGE_SIZE = 5;

export const myActivitiesQueryKeys = {
  all: () => ['myActivities'] as const,
};

export const myActivitiesQueryOptions = {
  all: (size = MY_ACTIVITIES_PAGE_SIZE) => {
    return {
      queryKey: myActivitiesQueryKeys.all(),
      queryFn: () => getMyActivities(undefined, size),
    };
  },
};
