'use client';

import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>{product.name}</h1>
        <p className='text-lg text-gray-600 mb-6'>{product.description}</p>
      </div>

      {/* Price */}
      <div className='flex items-center gap-4'>
        <span className='text-3xl md:text-4xl font-bold text-gray-900'>
          {formatPrice(product.price)}
        </span>
        {product.originalPrice && (
          <span className='text-xl text-gray-400 line-through'>
            {formatPrice(product.originalPrice)}
          </span>
        )}
        {product.discount && (
          <span className='px-3 py-1 bg-red-100 text-red-600 rounded-md font-semibold'>
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Quantity Selector */}
      <div className='flex items-center gap-4'>
        <span className='text-gray-700 font-medium'>Quantity:</span>
        <div className='flex items-center gap-2 border border-gray-300 rounded-lg'>
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className='px-4 py-2 hover:bg-gray-100 transition-colors'
            aria-label='Decrease quantity'
          >
            -
          </button>
          <span className='px-4 py-2 min-w-[60px] text-center font-semibold'>{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className='px-4 py-2 hover:bg-gray-100 transition-colors'
            aria-label='Increase quantity'
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <Button size='lg' onClick={handleAddToCart} className='flex-1'>
          Add to Cart
        </Button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleItem(product)}
          className={`px-6 py-3 rounded-lg border-2 font-semibold transition-colors ${
            isInWishlist
              ? 'border-red-500 text-red-500 bg-red-50'
              : 'border-gray-300 text-gray-700 hover:border-beige-600 hover:text-beige-600'
          }`}
        >
          {isInWishlist ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
        </motion.button>
      </div>

      {/* Product Details */}
      <div className='pt-6 border-t border-gray-200'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Product Details</h3>
        <ul className='space-y-2 text-gray-600'>
          <li>• Premium quality materials</li>
          <li>• Modern design</li>
          <li>• Easy to assemble</li>
          <li>• 1-year warranty</li>
        </ul>
      </div>
    </div>
  );
}
