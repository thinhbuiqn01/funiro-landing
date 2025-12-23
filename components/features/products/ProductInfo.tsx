'use client';

import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className='p-4'>
      <h3 className='text-lg font-semibold text-gray-900 mb-1'>{product.name}</h3>
      <p className='text-sm text-gray-600 mb-2'>{product.description}</p>
      <div className='flex items-center gap-2'>
        <span className='text-lg font-bold text-gray-900'>{formatPrice(product.price)}</span>
        {product.originalPrice && (
          <span className='text-sm text-gray-400 line-through'>
            {formatPrice(product.originalPrice)}
          </span>
        )}
      </div>
    </div>
  );
}
