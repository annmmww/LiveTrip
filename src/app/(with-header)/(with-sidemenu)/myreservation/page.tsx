import MyReservationsSection from '@/domains/myreservation/components/MyReservationsSection';

export default async function Page() {
  return (
    <>
      <main className='w-full'>
        <header>
          <h1 className='text-18 mb-2.5 font-bold text-gray-950'>예약내역</h1>
          <p className='text-gray-500'>예약내역 변경 및 취소할 수 있습니다.</p>
        </header>
        <MyReservationsSection />
      </main>
    </>
  );
}
