'use client';

import { useQuery } from '@tanstack/react-query';
import { cx } from 'class-variance-authority';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { getMyActivity } from '@/domains/activities/api';
import type { ActivityInfoProps } from './type';
import type { Schedule } from '../type';

const PANEL_CLASS_NAME =
  'mt-3 w-81.75 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_10px_30px_rgba(156,180,202,0.18)] sm:w-119 md:w-160';

const formatScheduleDate = (date: string) => {
  try {
    return format(parseISO(date), 'M월 d일 (EEE)', { locale: ko });
  } catch {
    return date;
  }
};

const sortSchedules = (schedules: Schedule[]) => {
  return [...schedules].sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);

    if (dateCompare !== 0) {
      return dateCompare;
    }

    return a.startTime.localeCompare(b.startTime);
  });
};

export default function ActivityInfo({ id, className }: ActivityInfoProps) {
  const {
    data: activity,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['myActivities', 'detail', id],
    queryFn: () => getMyActivity(id),
  });

  if (isPending) {
    return (
      <section className={cx(PANEL_CLASS_NAME, className)}>
        <div className='animate-pulse px-5 py-5 sm:px-6 sm:py-6 md:px-7 md:py-7'>
          <div className='mb-5 flex items-start justify-between gap-4'>
            <div className='space-y-2'>
              <div className='h-3 w-20 rounded-full bg-gray-100' />
              <div className='h-6 w-36 rounded-full bg-gray-100' />
            </div>
            <div className='h-8 w-28 rounded-full bg-gray-100' />
          </div>
          <div className='grid gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]'>
            <div className='h-33 rounded-3xl bg-gray-50' />
            <div className='space-y-3'>
              <div className='h-15 rounded-3xl bg-gray-50' />
              <div className='h-15 rounded-3xl bg-gray-50' />
            </div>
          </div>
          <div className='mt-4 h-34 rounded-3xl bg-gray-50' />
        </div>
      </section>
    );
  }

  if (isError || !activity) {
    return (
      <section className={cx(PANEL_CLASS_NAME, className)}>
        <div className='flex flex-col items-start gap-3 px-5 py-5 sm:px-6 sm:py-6 md:px-7 md:py-7'>
          <span className='rounded-full bg-red-50 px-3 py-1 text-12 font-semibold text-red-500'>
            불러오기 실패
          </span>
          <div>
            <h3 className='text-16 font-bold text-gray-950 sm:text-18'>
              상세 정보를 불러오지 못했어요
            </h3>
            <p className='mt-1 text-14 leading-5 text-gray-500'>
              잠시 후 다시 시도해 주세요.
            </p>
          </div>
          <button
            type='button'
            onClick={() => refetch()}
            className='text-14 rounded-xl border border-gray-200 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50'
          >
            다시 불러오기
          </button>
        </div>
      </section>
    );
  }

  const schedules = sortSchedules(activity.schedules);
  const description =
    activity.description.trim() || '등록된 체험 설명이 아직 없습니다.';

  return (
    <section className={cx(PANEL_CLASS_NAME, className)}>
      <div className='px-5 py-5 sm:px-6 sm:py-6 md:px-7 md:py-7'>
        <div className='mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
          <div>
            <p className='text-12 font-semibold tracking-[0.18em] text-primary-500 uppercase'>
              Activity Detail
            </p>
            <h3 className='mt-1 text-16 font-bold text-gray-950 sm:text-18 md:text-20'>
              운영 정보
            </h3>
            <p className='mt-1 text-14 leading-5 text-gray-500'>
              체험 설명과 운영 일정을 한눈에 확인할 수 있어요.
            </p>
          </div>
          <div className='flex w-fit items-center gap-2 rounded-full bg-primary-100 px-3 py-2'>
            <div className='relative h-4 w-4'>
              <Image
                src='/icons/icon_calendar.svg'
                alt='일정'
                fill
                className='object-contain'
              />
            </div>
            <span className='text-13 font-semibold text-primary-500'>
              등록 일정 {schedules.length}개
            </span>
          </div>
        </div>

        <div className='grid gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]'>
          <section className='rounded-3xl bg-gray-50 px-4 py-4 sm:px-5 sm:py-5'>
            <p className='text-13 font-semibold text-gray-500'>체험 설명</p>
            <p className='mt-3 text-14 leading-6 whitespace-pre-line text-gray-800 sm:text-15'>
              {description}
            </p>
          </section>

          <div className='space-y-3'>
            <section className='rounded-3xl border border-gray-100 px-4 py-4 sm:px-5'>
              <p className='text-13 font-semibold text-gray-500'>카테고리</p>
              <div className='mt-3'>
                <span className='inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-13 font-semibold text-blue-600'>
                  {activity.category}
                </span>
              </div>
            </section>

            <section className='rounded-3xl border border-gray-100 px-4 py-4 sm:px-5'>
              <p className='text-13 font-semibold text-gray-500'>주소</p>
              <div className='mt-3 flex items-start gap-2'>
                <div className='relative mt-0.5 h-4 w-4 shrink-0'>
                  <Image
                    src='/icons/icon_locations.svg'
                    alt='주소'
                    fill
                    className='object-contain'
                  />
                </div>
                <p className='text-14 leading-5 text-gray-800'>
                  {activity.address}
                </p>
              </div>
            </section>
          </div>
        </div>

        <section className='mt-4 rounded-3xl border border-gray-100 px-4 py-4 sm:px-5 sm:py-5'>
          <div className='flex items-center gap-2'>
            <div className='relative h-4 w-4'>
              <Image
                src='/icons/icon_calendar.svg'
                alt='운영 일정'
                fill
                className='object-contain'
              />
            </div>
            <h4 className='text-15 font-bold text-gray-900 sm:text-16'>
              운영 일정
            </h4>
          </div>

          {schedules.length > 0 ? (
            <div className='mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3'>
              {schedules.map((a: Schedule) => {
                return (
                  <article
                    key={a.id}
                    className='rounded-2xl bg-gray-50 px-4 py-3'
                  >
                    <p className='text-14 font-semibold text-gray-900'>
                      {formatScheduleDate(a.date)}
                    </p>
                    <p className='mt-1 text-13 text-gray-600'>
                      {a.startTime} ~ {a.endTime}
                    </p>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className='mt-4 rounded-2xl bg-gray-50 px-4 py-6 text-center text-14 text-gray-500'>
              등록된 일정이 아직 없습니다.
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
