'use server';

import { revalidatePath } from 'next/cache';
import {
  createActivity,
  type MyActivityDetail,
  updateActivity,
} from '@/domains/activities/api';
import { ApiError } from '@/lib/api/api';
import { buildRegistrationPayload } from '@/domains/registration/lib/buildRegistrationPayload';
import { buildUpdatePayload } from '@/domains/registration/lib/buildUpdatePayload';
import type { FormValues, TimeSlot } from '@/domains/registration/type';

interface SaveActivityInput {
  mode: 'create' | 'edit';
  formValues: FormValues;
  timeSlots: TimeSlot[];
  initialData?: MyActivityDetail;
}

interface SaveActivityResult {
  status: 'success' | 'error';
  message: string;
}

export async function saveActivityAction({
  mode,
  formValues,
  timeSlots,
  initialData,
}: SaveActivityInput): Promise<SaveActivityResult> {
  try {
    if (mode === 'edit') {
      if (!initialData?.id) {
        return {
          status: 'error',
          message: '수정할 체험 정보가 없습니다.',
        };
      }

      const payload = buildUpdatePayload(initialData, formValues, timeSlots);
      await updateActivity(initialData.id, payload);
      revalidatePath(`/myactivities/${initialData.id}/edit`);
    } else {
      const payload = buildRegistrationPayload({
        formData: {
          title: formValues.title,
          description: formValues.description,
          category: formValues.category,
          price: formValues.price,
          address: formValues.address,
        },
        bannerImageUrl: formValues.bannerImage,
        introImages: formValues.subImageUrls.map((url) => ({ src: url })),
        timeSlots,
      });

      await createActivity(payload);
      revalidatePath('/registration');
    }

    revalidatePath('/myactivities');

    return {
      status: 'success',
      message:
        mode === 'edit'
          ? '체험 수정이 완료되었습니다.'
          : '체험 등록이 완료되었습니다.',
    };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof ApiError
          ? error.message
          : mode === 'edit'
            ? '수정 중 오류가 발생했습니다.'
            : '등록 중 오류가 발생했습니다.',
    };
  }
}
