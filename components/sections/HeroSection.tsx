'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden pt-20'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/images/hero/hero-bg.jpg'
          alt='Modern interior'
          fill
          priority
          className='object-cover'
          sizes='100vw'
        />
        <div className='absolute inset-0 bg-black/20' />
      </div>

      {/* Content */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='flex justify-end'>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className='bg-beige-100/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-lg shadow-2xl'
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className='text-sm font-semibold text-beige-700 mb-4 uppercase tracking-wide'
            >
              New Arrival
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight'
            >
              Discover Our New Collection
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className='text-gray-700 mb-8 leading-relaxed'
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
              ullamcorper mattis.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Button size='lg' className='w-full md:w-auto'>
                BUY NOW
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
