import type { activityCategory, sortType } from '@/domains/activities/type';

export interface homeSearchParams {
  sort?: sortType;
  category?: activityCategory;
}
export interface AllActivitySectionProps {
  sort?: sortType;
  category?: activityCategory;
}
export type AllActivityDataWrapperProps = AllActivitySectionProps;
export interface useInfiniteActivitiesParams extends AllActivitySectionProps {
  keyword?: string;
}
