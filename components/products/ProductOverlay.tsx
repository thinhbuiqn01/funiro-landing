'use client'

import { motion } from 'framer-motion'
import { Product } from '@/types'
import AddToCartButton from './AddToCartButton'
import ShareButton from './ShareButton'
import LikeButton from './LikeButton'
import CompareButton from './CompareButton'

interface ProductOverlayProps {
  product: Product
}

export default function ProductOverlay({ product }: ProductOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      className='absolute inset-0 bg-black/50 flex items-center justify-center gap-4'
    >
      <AddToCartButton product={product} />
      <div className='flex flex-col gap-3'>
        <ShareButton product={product} />
        <CompareButton />
        <LikeButton product={product} />
      </div>
    </motion.div>
  )
}

