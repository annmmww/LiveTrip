import { Suspense } from 'react';
import AllActivitySection from '@/domains/home/containers/all-activity-section/AllActivitySection';
import PopularActivitySection from '@/domains/home/containers/popular-activity-section/PopularActivitySection';
import ToastLayer from '@/domains/home/containers/ToastLayer';
import type { homeSearchParams } from '@/domains/home/type';
import IntroSection from '@/domains/home/containers/IntroSection';
import PopularActivitySectionSkeleton from '@/domains/home/containers/popular-activity-section/PopularActivitySectionSkeleton';
import AllActivityPrefetch from '@/domains/home/containers/all-activity-section/AllActivityPrefetch';
import GridCardListSkeleton from '@/domains/home/containers/GridCardListSkeleton';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<homeSearchParams>;
}) {
  const { sort, category } = await searchParams;
  const suspenseKey = `${sort}-${category}`;

  return (
    <>
      <IntroSection />
      <div className='flex-center w-full flex-col gap-20'>
        <Suspense fallback={<PopularActivitySectionSkeleton />}>
          <PopularActivitySection />
        </Suspense>
        <AllActivitySection sort={sort} category={category}>
          <Suspense
            fallback={<GridCardListSkeleton length={8} />}
            key={suspenseKey}
          >
            <AllActivityPrefetch sort={sort} category={category} />
          </Suspense>
        </AllActivitySection>
      </div>
      <Suspense>
        <ToastLayer />
      </Suspense>
    </>
  );
}
