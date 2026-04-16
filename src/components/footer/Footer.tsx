import Link from 'next/link';
import SocialIcons from '@/components/footer/components/SocialIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full border-t border-gray-200 bg-white px-6 py-8 md:px-20 md:py-10 lg:px-50'>
      <div className='grid grid-cols-2 gap-4 text-gray-500 md:grid-cols-3'>
        {/* 저작권*/}
        <div className='order-2 text-sm text-gray-400 md:order-1 md:block'>
          &copy;Part4_Team4 - {currentYear}
        </div>
        {/* 정책 */}
        <div className='order-1 col-span-2 space-x-4 justify-self-center md:order-2 md:col-span-1'>
          <Link href='/privacy' className='text-gray-600'>
            Privacy Policy
          </Link>
          <span className='text-gray-600'>·</span>
          <Link href='/faq' className='text-gray-600'>
            FAQ
          </Link>
        </div>
        {/* 소셜 */}
        <div className='order-3 justify-self-end'>
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
}
