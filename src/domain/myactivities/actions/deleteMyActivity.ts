'use server';

import { revalidatePath } from 'next/cache';
import { deleteMyActivity } from '@/domain/myactivities/api';

interface DeleteMyActivityResult {
  status: 'success' | 'error';
  message: string;
}

export async function deleteMyActivityAction(
  activityId: number
): Promise<DeleteMyActivityResult> {
  if (!activityId) {
    return {
      status: 'error',
      message: '잘못된 요청입니다.',
    };
  }

  const result = await deleteMyActivity(activityId);

  if (!result.ok) {
    switch (result.status) {
      case 400:
        return {
          status: 'error',
          message: '신청 예약이 있는 체험은 삭제할 수 없습니다.',
        };
      case 401:
        return {
          status: 'error',
          message: '로그인이 필요합니다.',
        };
      case 403:
        return {
          status: 'error',
          message: '본인의 체험만 삭제할 수 있습니다.',
        };
      case 404:
        return {
          status: 'error',
          message: '존재하지 않는 체험입니다.',
        };
      default:
        return {
          status: 'error',
          message: '알 수 없는 오류가 발생했습니다.',
        };
    }
  }

  revalidatePath('/myactivities');

  return {
    status: 'success',
    message: '체험이 삭제되었습니다.',
  };
}
