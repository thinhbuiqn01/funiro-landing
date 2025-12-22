'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { categories } from '@/lib/data'

export default function BrowseRangeSection() {
  return (
    <section id='about' className='py-20 md:py-28 bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <AnimatedSection className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>Browse The Range</h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </AnimatedSection>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
          {categories.map((category, index) => (
            <AnimatedSection key={category.id} delay={index * 0.1}>
              <motion.div whileHover={{ y: -10 }} className='group cursor-pointer'>
                <div className='relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-gray-100'>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                    sizes='(max-width: 768px) 100vw, 33vw'
                  />
                </div>
                <h3 className='text-xl font-semibold text-gray-900 text-center'>{category.name}</h3>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
