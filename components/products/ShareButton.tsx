'use client'

import { motion } from 'framer-motion'
import { Product } from '@/types'
import { shareProduct } from '@/lib/utils/share'
import { useState } from 'react'

interface ShareButtonProps {
  product: Product
  className?: string
}

export default function ShareButton({ product, className = '' }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    await shareProduct(product)
    setTimeout(() => setIsSharing(false), 500)
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleShare}
      disabled={isSharing}
      className={`w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-beige-50 transition-colors disabled:opacity-50 ${className}`}
      aria-label='Share'
    >
      {isSharing ? (
        <svg
          className='w-5 h-5 animate-spin'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
          />
        </svg>
      ) : (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
          />
        </svg>
      )}
    </motion.button>
  )
}

