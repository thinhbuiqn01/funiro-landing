'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useCartStore } from '@/store/useCartStore'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/types'

interface CartItemProps {
  product: Product & { quantity: number }
}

export default function CartItem({ product }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(product.id)
    } else {
      updateQuantity(product.id, newQuantity)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className='flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl'
    >
      <div className='relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0'>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className='object-cover'
          sizes='96px'
        />
      </div>

      <div className='flex-1 min-w-0'>
        <h3 className='font-semibold text-gray-900 mb-1 truncate'>{product.name}</h3>
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

      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-2 border border-gray-300 rounded-lg'>
          <button
            onClick={() => handleQuantityChange(product.quantity - 1)}
            className='px-3 py-2 hover:bg-gray-100 transition-colors'
            aria-label='Decrease quantity'
          >
            -
          </button>
          <span className='px-4 py-2 min-w-[50px] text-center font-semibold'>
            {product.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(product.quantity + 1)}
            className='px-3 py-2 hover:bg-gray-100 transition-colors'
            aria-label='Increase quantity'
          >
            +
          </button>
        </div>

        <div className='text-right min-w-[100px]'>
          <p className='text-lg font-bold text-gray-900'>
            {formatPrice(product.price * product.quantity)}
          </p>
        </div>

        <button
          onClick={() => removeItem(product.id)}
          className='p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors'
          aria-label='Remove item'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
            />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

