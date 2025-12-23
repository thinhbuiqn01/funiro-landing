'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/features/cart/CartItem';
import CartSummary from '@/components/features/cart/CartSummary';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

function CartContent() {
  const items = useCartStore((state) => state.items);
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className='text-center py-20'>
        <div className='mb-6'>
          <svg
            className='w-24 h-24 mx-auto text-gray-300'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
            />
          </svg>
        </div>
        <h2 className='text-3xl font-bold text-gray-900 mb-4'>Your cart is empty</h2>
        <p className='text-gray-600 mb-8'>
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link href='/#products'>
          <Button size='lg'>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
      <div className='lg:col-span-2 space-y-4'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900'>Shopping Cart</h1>
          <span className='text-gray-600'>{items.length} item(s)</span>
        </div>
        {items.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
      </div>
      <div className='lg:col-span-1'>
        <CartSummary onCheckout={handleCheckout} />
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <main className='min-h-screen'>
      <Header />
      <div className='pt-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <CartContent />
        </div>
      </div>
      <Footer />
    </main>
  );
}
