'use client';

import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Link from 'next/link';

interface CartSummaryProps {
  onCheckout?: () => void;
}

export default function CartSummary({ onCheckout }: CartSummaryProps) {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getTotalPrice());
  const shipping = subtotal > 0 ? 5.0 : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className='bg-white border border-gray-200 rounded-2xl p-6 sticky top-24'>
      <h2 className='text-2xl font-bold text-gray-900 mb-6'>Order Summary</h2>

      <div className='space-y-4 mb-6'>
        <div className='flex justify-between text-gray-600'>
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className='flex justify-between text-gray-600'>
          <span>Shipping</span>
          <span>{shipping > 0 ? formatPrice(shipping) : 'Free'}</span>
        </div>
        <div className='flex justify-between text-gray-600'>
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className='border-t border-gray-200 pt-4'>
          <div className='flex justify-between text-xl font-bold text-gray-900'>
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <div className='space-y-3'>
        <Button size='lg' className='w-full' onClick={onCheckout}>
          Proceed to Checkout
        </Button>
        <Link href='/' className='block'>
          <Button variant='outline' size='lg' className='w-full'>
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
