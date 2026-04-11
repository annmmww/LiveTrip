import { Suspense } from 'react';
import SearchResult from '@/domains/home/containers/search/SearchResult';
import IntroSection from '@/domains/home/containers/IntroSection';
import SearchResultSkeleton from '@/domains/home/containers/search/SearchResultSkeleton';

export default async function HomeSearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
  }>;
}) {
  const { q } = await searchParams;

  return (
    <>
      <IntroSection />
      <Suspense key={q} fallback={<SearchResultSkeleton />}>
        <SearchResult q={q} />
      </Suspense>
    </>
  );
}
