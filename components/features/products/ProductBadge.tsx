'use client';

import { Product } from '@/types';

interface ProductBadgeProps {
  badge: Product['badge'];
  discount?: number;
}

export default function ProductBadge({ badge, discount }: ProductBadgeProps) {
  if (!badge) return null;

  return (
    <div
      className={`absolute top-4 left-4 px-3 py-1 rounded-md text-sm font-semibold z-10 ${
        badge === 'new' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      {badge === 'new' ? 'New' : `-${discount}%`}
    </div>
  );
}
