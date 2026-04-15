'use client';
import Image from 'next/image';
import type { ActivityCardProps } from '@/domains/myactivities/components/type';
import { useRouter } from 'next/navigation';
import { useState, type KeyboardEvent } from 'react';
import ActivityInfo from './ActivityInfo';

const useGoEdit = () => {
  const router = useRouter();

  const goEditById = (id: number) => {
    router.push(`/myactivities/${id}/edit`);
  };

  return { goEditById };
};

export default function ActivityCard({
  id,
  title,
  rating,
  reviewCount,
  price,
  bannerImageUrl,
  onDelete,
}: ActivityCardProps) {
  const formattedPrice = `₩${price.toLocaleString()}`;
  const [isCardOpen, setIsCardOpen] = useState(false);

  const { goEditById } = useGoEdit();

  const onClickActivityCard = () => {
    setIsCardOpen((prev) => !prev);
  };

  const onKeyDownActivityCard = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClickActivityCard();
    }
  };

  return (
    <div>
      <div
        role='button'
        tabIndex={0}
        onClick={onClickActivityCard}
        onKeyDown={onKeyDownActivityCard}
        className='block w-full text-left'
      >
        {/* sm 기준 */}
        <div className='relative flex sm:hidden'>
          <div className='flex h-44.5 w-81.75 justify-between rounded-3xl p-6 shadow-[0_4px_24px_rgba(156,180,202,0.2)]'>
            <div className='flex flex-col justify-between'>
              <h2 className='text-16 mb-1.5 flex items-center leading-4.75 font-bold text-gray-950'>
                {title}
              </h2>
              <div className='mb-2.5 flex items-center gap-0.5'>
                <div className='relative h-3.5 w-3.5'>
                  <Image
                    fill
                    src='/icons/star.svg'
                    alt='별점'
                    className='object-cover'
                  />
                </div>
                <div className='text-13 flex gap-0.5 leading-4 text-gray-500'>
                  <p>{rating}</p>
                  <p>({reviewCount})</p>
                </div>
              </div>
              <div className='mb-3 flex items-center gap-1'>
                <p className='text-16 leading-4.75 font-bold text-gray-950'>
                  {formattedPrice}
                </p>
                <p className='text-14 font-medium text-gray-400'>/ 인</p>
              </div>
              <div className='flex gap-2'>
                <button
                  type='button'
                  className='text-14 h-7.25 w-17 rounded-lg border border-gray-50 font-medium text-gray-600'
                  onClick={(e) => {
                    e.stopPropagation();
                    goEditById(id);
                  }}
                >
                  수정하기
                </button>
                <button
                  type='button'
                  className='text-14 h-7.25 w-17 rounded-lg bg-gray-50 font-medium text-gray-600'
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.();
                  }}
                >
                  삭제하기
                </button>
              </div>
            </div>
            <div className='relative h-20.5 w-20.5'>
              <Image
                fill
                className='rounded-5xl object-cover'
                src={bannerImageUrl}
                alt={title}
              />
            </div>
          </div>
        </div>
        {/* md 기준 */}
        <div className='hidden sm:flex md:hidden'>
          <div className='flex h-39.75 w-119 justify-between rounded-3xl p-6 leading-none shadow-[0_4px_24px_rgba(156,180,202,0.2)]'>
            <div>
              <h2 className='text-16 mb-1.5 leading-4.75 font-bold text-gray-950'>
                {title}
              </h2>
              <div className='mb-2.5 flex items-center gap-0.5'>
                <div className='relative h-3.5 w-3.5'>
                  <Image
                    fill
                    src='/icons/star.svg'
                    alt='별점'
                    className='object-cover'
                  />
                </div>
                <div className='text-13 flex gap-0.5 leading-4 text-gray-500'>
                  <p>{rating}</p>
                  <p>({reviewCount})</p>
                </div>
              </div>
              <div className='mb-3 flex items-center gap-1'>
                <p className='text-16 leading-4.75 font-bold text-gray-950'>
                  {formattedPrice}
                </p>
                <p className='text-14 font-medium text-gray-400'>/ 인</p>
              </div>
              <div className='flex gap-2'>
                <button
                  type='button'
                  className='text-14 h-7.25 w-17 rounded-lg border border-gray-50 font-medium text-gray-600'
                  onClick={(e) => {
                    e.stopPropagation();
                    goEditById(id);
                  }}
                >
                  수정하기
                </button>
                <button
                  type='button'
                  className='text-14 h-7.25 w-17 rounded-lg bg-gray-50 font-medium text-gray-600'
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.();
                  }}
                >
                  삭제하기
                </button>
              </div>
            </div>
            <div className='relative flex h-20.5 w-20.5'>
              <Image
                fill
                className='rounded-5xl object-cover md:rounded-4xl'
                src={bannerImageUrl}
                alt={title}
              />
            </div>
          </div>
        </div>
        {/* lg 기준 */}
        <div className='hidden md:flex'>
          <div className='flex h-50.5 w-160 items-center justify-between rounded-3xl px-7.5 shadow-[0_4px_24px_rgba(156,180,202,0.2)]'>
            <div>
              <h2 className='text-18 mb-2 font-bold text-gray-950'>{title}</h2>
              <div className='mb-3 flex items-center gap-0.5'>
                <div className='relative h-4 w-4'>
                  <Image
                    fill
                    src='/icons/star.svg'
                    alt='별점'
                    className='object-cover'
                  />
                </div>
                <div className='text-16 flex gap-0.5 font-medium text-gray-500'>
                  <p>{rating}</p>
                  <p>({reviewCount})</p>
                </div>
              </div>
              <div className='mb-5 flex items-center gap-1'>
                <p className='text-18 font-bold text-gray-950'>
                  {formattedPrice}
                </p>
                <p className='text-16 font-medium text-gray-400'>/ 인</p>
              </div>
              <div className='flex gap-2'>
                <button
                  type='button'
                  className='text-14 h-7.25 w-17 rounded-lg border border-gray-50 font-medium text-gray-600'
                  onClick={(e) => {
                    e.stopPropagation();
                    goEditById(id);
                  }}
                >
                  수정하기
                </button>
                <button
                  type='button'
                  className='text-14 h-7.25 w-17 rounded-lg bg-gray-50 font-medium text-gray-600'
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.();
                  }}
                >
                  삭제하기
                </button>
              </div>
            </div>
            <div className='relative h-35.5 w-35.5'>
              <Image
                fill
                className='rounded-4xl object-cover'
                src={bannerImageUrl}
                alt={title}
              />
            </div>
          </div>
        </div>
      </div>
      {isCardOpen && <ActivityInfo id={id} />}
    </div>
  );
}
