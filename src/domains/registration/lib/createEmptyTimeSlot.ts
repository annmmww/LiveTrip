import type { TimeSlot } from '@/domains/registration/type';

export function createEmptyTimeSlot(): TimeSlot {
  return {
    id: `${Date.now()}-${Math.random()}`,
    date: '',
    startTime: '',
    endTime: '',
  };
}
