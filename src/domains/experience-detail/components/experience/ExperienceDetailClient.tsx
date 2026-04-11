'use client';

import { useState } from 'react';
import ReservationCard from '@/domains/experience-detail/components/reservation/ReservationCard';
import type {
  AvailableSchedule,
  ExperienceDetail,
} from '@/domains/experience-detail/type';

interface ExperienceDetailClientProps {
  experience: ExperienceDetail;
  isMyExperience: boolean;
  initialAvailableSchedules: AvailableSchedule[];
}

export default function ExperienceDetailClient({
  experience,
  isMyExperience,
  initialAvailableSchedules,
}: ExperienceDetailClientProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [participantCount, setParticipantCount] = useState(1);

  if (isMyExperience) {
    return null;
  }

  return (
    <div className='lg:col-span-1'>
      <ReservationCard
        experience={experience}
        initialAvailableSchedules={initialAvailableSchedules}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        participantCount={participantCount}
        onDateChange={setSelectedDate}
        onTimeChange={setSelectedTime}
        onParticipantChange={setParticipantCount}
      />
    </div>
  );
}
