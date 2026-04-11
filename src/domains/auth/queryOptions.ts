import { getUserInfo } from '@/domains/auth/api';

export const queryKeys = {
  me: () => {
    return ['me'] as const;
  },
};

export const queryOptions = {
  me: () => {
    return {
      queryKey: queryKeys.me(),
      queryFn: () => getUserInfo(),
    };
  },
};
