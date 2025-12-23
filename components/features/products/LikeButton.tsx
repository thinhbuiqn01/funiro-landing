'use client';

import { motion } from 'framer-motion';
import { Product } from '@/types';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useState } from 'react';

interface LikeButtonProps {
  product: Product;
  className?: string;
}

export default function LikeButton({ product, className = '' }: LikeButtonProps) {
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = () => {
    setIsToggling(true);
    toggleItem(product);
    setTimeout(() => setIsToggling(false), 300);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      disabled={isToggling}
      className={`w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-beige-50 transition-colors disabled:opacity-50 ${
        isInWishlist ? 'text-red-500' : ''
      } ${className}`}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {isInWishlist ? (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
          />
        </svg>
      ) : (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
          />
        </svg>
      )}
    </motion.button>
  );
}
