'use client';

import Image from 'next/image';
import { Product } from '@/types';
import ProductBadge from './ProductBadge';

interface ProductImageProps {
  product: Product;
}

export default function ProductImage({ product }: ProductImageProps) {
  return (
    <div className='relative aspect-square overflow-hidden bg-gray-100'>
      <Image
        src={product.image}
        alt={product.name}
        fill
        className='object-cover transition-transform duration-500 group-hover:scale-110'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
      />
      <ProductBadge badge={product.badge} discount={product.discount} />
    </div>
  );
}
