import ExperienceDetailClient from '@/domain/experience-detail/components/experience/ExperienceDetailClient';
import ExperienceInfo from '@/domain/experience-detail/components/experience/ExperienceInfo';
import ExperienceReviews from '@/domain/experience-detail/components/experience/ExperienceReviews';
import ImageGallery from '@/domain/experience-detail/components/experience/ImageGallery';
import KakaoMapScript from '@/domain/experience-detail/components/experience/KakaoMapScript';
import MobileExperienceHeader from '@/domain/experience-detail/components/experience/MobileExperienceHeader';
import type {
  ExperienceDetail,
  ReviewResponse,
} from '@/domain/experience-detail/type';
import {
  getAvailableSchedule,
  getExperienceDetail,
  getReviews,
} from '@/domain/experience-detail/api';
import { getAuth } from '@/utils/getAuth';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

function createImageArray(experience: ExperienceDetail): string[] {
  return [
    experience.bannerImageUrl,
    ...experience.subImages.map((img) => img.imageUrl),
  ];
}

function extractReviewData(reviewResponse: ReviewResponse) {
  return {
    reviews: reviewResponse.reviews,
    totalCount: reviewResponse.totalCount,
    averageRating: reviewResponse.averageRating,
  };
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const activityId = Number(id);

  const today = new Date();
  const year = today.getFullYear().toString();
  const month = String(today.getMonth() + 1).padStart(2, '0');

  try {
    const [session, experience, reviews, initialAvailableSchedules] =
      await Promise.all([
        getAuth(),
        getExperienceDetail(activityId),
        getReviews(activityId, 1, 10),
        getAvailableSchedule(activityId, year, month),
      ]);

    const imageArray = createImageArray(experience);
    const reviewData = extractReviewData(reviews);
    const isMyExperience = experience.userId === session?.user.id;

    return (
      <div className='min-h-screen'>
        <KakaoMapScript />
        <div className='mx-auto max-w-7xl px-4 py-4 pb-32 sm:px-6 sm:py-6 sm:pb-32 lg:px-8 lg:py-8 lg:pb-60'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8'>
            <div className='space-y-6 lg:col-span-2 lg:space-y-8'>
              <ImageGallery images={imageArray} />

              <div className='lg:hidden'>
                <MobileExperienceHeader experience={experience} />
              </div>

              <ExperienceInfo
                description={experience.description}
                address={experience.address}
              />

              <ExperienceReviews
                reviews={reviewData.reviews}
                totalReviews={reviewData.totalCount}
                averageRating={reviewData.averageRating}
                activityId={activityId}
              />
            </div>

            <ExperienceDetailClient
              experience={experience}
              isMyExperience={isMyExperience}
              initialAvailableSchedules={initialAvailableSchedules}
            />
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
