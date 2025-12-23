'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <main className='min-h-screen'>
      <Header />
      <div className='pt-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='max-w-2xl mx-auto text-center'
          >
            <div className='mb-8'>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className='w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center'
              >
                <svg
                  className='w-12 h-12 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </motion.div>
            </div>

            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
              Order Placed Successfully!
            </h1>
            <p className='text-lg text-gray-600 mb-2'>
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            {orderId && <p className='text-sm text-gray-500 mb-8'>Order ID: {orderId}</p>}

            <div className='bg-white border border-gray-200 rounded-2xl p-6 mb-8'>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>What's Next?</h2>
              <ul className='text-left space-y-2 text-gray-600'>
                <li className='flex items-start gap-2'>
                  <span className='text-green-600 mt-1'>✓</span>
                  <span>You will receive an email confirmation shortly</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-green-600 mt-1'>✓</span>
                  <span>Your order will be processed within 1-2 business days</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-green-600 mt-1'>✓</span>
                  <span>You will receive tracking information once your order ships</span>
                </li>
              </ul>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/'>
                <Button size='lg'>Continue Shopping</Button>
              </Link>
              <Link href='/products/1'>
                <Button variant='outline' size='lg'>
                  View Products
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
