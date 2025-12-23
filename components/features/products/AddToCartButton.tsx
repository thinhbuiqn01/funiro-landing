'use client';

import { motion } from 'framer-motion';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export default function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isInCart = useCartStore((state) => state.isInCart(product.id));
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-beige-50 transition-colors disabled:opacity-50 ${className}`}
    >
      {isInCart ? 'In Cart' : isAdding ? 'Adding...' : 'Add to cart'}
    </motion.button>
  );
}
