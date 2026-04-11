import { getAllActivitiesWithCache } from '@/domains/activities/api';
import { getAllActivitiesParams } from '@/domains/activities/type';
import PopularActivityCarouselWrapper from '@/domains/home/containers/popular-activity-section/PopularActivityCarouselWrapper';

export default async function PopularActivitySection() {
  const { activities } = await getAllActivitiesWithCache({
    sort: 'most_reviewed',
    page: 1,
    size: 16,
    method: 'offset',
  } as getAllActivitiesParams);
  return (
    <section className='relative w-full'>
      <h2 className='text-18 md:text-24 mb-6 font-bold md:mb-8'>
        🔥 인기 체험
      </h2>
      <PopularActivityCarouselWrapper activities={activities} />
    </section>
  );
}
