import RegistrationForm from '@/domains/registration/components/RegistrationForm';

export default function RegistrationPage() {
  return (
    <div className='mx-auto w-full'>
      <div className='-mx-6 md:-mx-8'>
        <div className='mx-auto box-content w-full max-w-175'>
          <h1 className='mb-6 text-2xl font-semibold'>체험 등록</h1>
          <RegistrationForm mode='create' />
        </div>
      </div>
    </div>
  );
}
