'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Product } from '@/types';
import ProductImage from '@/components/features/products/ProductImage';
import ProductOverlay from '@/components/features/products/ProductOverlay';
import ProductInfo from '@/components/features/products/ProductInfo';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -10 }}
      className='group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300'
    >
      <Link href={`/products/${product.id}`} className='block'>
        <div className='relative'>
          <ProductImage product={product} />
          <ProductOverlay product={product} />
        </div>
        <ProductInfo product={product} />
      </Link>
    </motion.div>
  );
}
