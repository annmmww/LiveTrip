'use client';
import Image from 'next/image';
import { useEffect, useRef, useState, useTransition } from 'react';
import ActivitiyCard from '@/domains/myactivities/components/ActivityCard';
import type { Activity, MyActivities } from '@/domains/myactivities/type';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useRouter } from 'next/navigation';
import {
  AlertModalContents,
  ModalContainer,
  useDialog,
} from '@/components/dialog';
import { useMyActivities } from '@/domains/myactivities/hooks/useMyActivities';
import { deleteMyActivityAction } from '@/domains/myactivities/actions/deleteMyActivity';
import { toast } from '@/components/feedback/toast';

interface MyActivitySectionProps {
  initialData?: MyActivities;
}

export default function MyActivitySection({
  initialData,
}: MyActivitySectionProps) {
  const router = useRouter();
  const {
    activities,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useMyActivities(initialData);

  const hasActivities = Boolean(totalCount);

  const deleteDialog = useDialog();
  const [targetId, setTargetId] = useState<number | null>(null);
  const [isDeletePending, startDeleteTransition] = useTransition();

  const onDeleteActivity = (id: number) => {
    setTargetId(id);
    deleteDialog.openDialog();
  };

  const handleConfirmDelete = async () => {
    if (!targetId) {
      return;
    }
    deleteDialog.hideDialog();
    startDeleteTransition(async () => {
      const result = await deleteMyActivityAction(targetId);
      toast({
        message: result.message,
        eventType: result.status === 'success' ? 'success' : 'error',
      });

      if (result.status === 'success') {
        router.refresh();
      }
    });
  };

  const [page, setPage] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { loader } = useIntersectionObserver({
    loading: isFetchingNextPage,
    hasMore: hasNextPage,
    setPage,
    rootRef: containerRef,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.1,
  });

  useEffect(() => {
    if (page > 0) {
      fetchNextPage();
    }
  }, [page, fetchNextPage]);

  if (isLoading) {
    return (
      <div className='mt-7.5 flex flex-col'>
        <div className='flex items-center justify-center'>
          <Image
            src='/images/reservation_empty.png'
            alt='empty'
            width={122}
            height={122}
            className='mb-7.5'
          />
        </div>
        <p className='text-18 mb-7.5 flex justify-center font-medium text-gray-600'>
          내 체험 관리 로딩 중입니다.
        </p>
        <div className='flex justify-center'></div>
      </div>
    );
  }

  return (
    <>
      <ModalContainer dialogRef={deleteDialog.dialogRef}>
        <AlertModalContents
          message='체험을 삭제하시겠어요?'
          confirmButtonText='삭제하기'
          rejectButtonText='아니오'
          hideModal={deleteDialog.hideDialog}
          confirmAction={handleConfirmDelete}
          isPending={isDeletePending}
        />
      </ModalContainer>
      <div
        ref={containerRef}
        className='scrollbar-hide flex h-200 flex-col gap-6 overflow-y-auto'
      >
        {hasActivities &&
          activities.map((a: Activity) => {
            return (
              <div key={a.id}>
                <ActivitiyCard
                  id={a.id}
                  title={a.title}
                  rating={a.rating}
                  reviewCount={a.reviewCount}
                  price={a.price}
                  bannerImageUrl={a.bannerImageUrl}
                  onDelete={() => onDeleteActivity(a.id)}
                />
              </div>
            );
          })}
        {hasActivities && hasNextPage && <div ref={loader} />}
        {!hasActivities && (
          <div className='mt-7.5 flex flex-col'>
            <div className='flex items-center justify-center'>
              <Image
                src='/images/reservation_empty.png'
                alt='empty'
                width={122}
                height={122}
                className='mb-7.5'
              />
            </div>
            <p className='text-18 mb-7.5 flex justify-center font-medium text-gray-600'>
              아직 생성한 체험이 없어요
            </p>
            <div className='flex justify-center'></div>
          </div>
        )}
      </div>
    </>
  );
}
