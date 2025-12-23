'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');

  return (
    <div className='flex flex-col lg:flex-row gap-4'>
      {/* Thumbnail Images */}
      <div className='flex lg:flex-col gap-2 order-2 lg:order-1'>
        {images.slice(0, 5).map((image, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(image)}
            onMouseEnter={() => setSelectedImage(image)}
            className={`relative w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === image
                ? 'border-beige-600 ring-2 ring-beige-200'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Image
              src={image}
              alt={`${productName} view ${index + 1}`}
              fill
              className='object-cover'
              sizes='80px'
            />
          </motion.button>
        ))}
      </div>

      {/* Main Image */}
      <div className='relative aspect-square w-full lg:flex-1 order-1 lg:order-2 rounded-2xl overflow-hidden bg-gray-100'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='relative w-full h-full'
          >
            <Image
              src={selectedImage}
              alt={productName}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 50vw'
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
