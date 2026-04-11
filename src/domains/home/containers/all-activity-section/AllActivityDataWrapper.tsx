'use client';
import { useEffect } from 'react';
import { toast } from '@/components/feedback/toast';
import Spinner from '@/components/ui/Spinner';
import { useInfiniteActivities } from '@/domains/activities/useActivitiesServcie';
import GridCardList from '@/domains/home/containers/GridCardList';
import type { AllActivityDataWrapperProps } from '@/domains/home/type';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export default function AllActivityDataWrapper({
  category,
  sort,
}: AllActivityDataWrapperProps) {
  const {
    items: activities,
    isFetchingNextPage,
    hasNextPage,
    isPending,
    error,
    setPage,
  } = useInfiniteActivities({
    category,
    sort,
  });

  const { loader } = useIntersectionObserver({
    loading: isPending || isFetchingNextPage,
    hasMore: hasNextPage,
    setPage,
  });

  useEffect(() => {
    if (error) {
      toast({ message: error.message, eventType: 'error' });
    }
  }, [error]);
  return (
    <div className='flex-center flex-col'>
      <GridCardList activities={activities} />
      <div className='mt-12'>{isFetchingNextPage && <Spinner size='md' />}</div>
      <div ref={loader} />
    </div>
  );
}
