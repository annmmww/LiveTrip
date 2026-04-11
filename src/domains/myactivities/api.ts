import { ApiError, apiFetch } from '@/lib/api/api';
import type { MyActivities } from '@/domains/myactivities/type';

export async function getMyActivities(
  cursorId?: number,
  size = 5
): Promise<MyActivities> {
  const params = new URLSearchParams({ size: String(size) });

  if (cursorId) {
    params.set('cursorId', String(cursorId));
  }

  return apiFetch<MyActivities>(`/my-activities?${params.toString()}`, {
    cache: 'no-store',
  });
}

export async function deleteMyActivity(id: number) {
  const body = { status: 'canceled' };

  try {
    await apiFetch(`/my-activities/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(body),
    });
    return { ok: true as const };
  } catch (error) {
    if (error instanceof ApiError) {
      return { ok: false as const, status: error.status };
    }
    return { ok: false as const, status: 500 };
  }
}
