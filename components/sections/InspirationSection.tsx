'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import { inspirationRooms } from '@/lib/data'

export default function InspirationSection() {
  const currentRoom = inspirationRooms[0]

  return (
    <section className='py-20 md:py-28 bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Left Content */}
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
                50+ Beautiful rooms inspiration
              </h2>
              <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
                Our designer already made a lot of beautiful prototipe of rooms that inspire you.
              </p>
              <Button size='lg'>Explore More</Button>
            </motion.div>
          </AnimatedSection>

          {/* Right Carousel */}
          <AnimatedSection delay={0.2}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='relative'
            >
              <div className='relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100'>
                <Image
                  src={currentRoom.image}
                  alt={currentRoom.title}
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                />
              </div>

              {/* Room Info Overlay */}
              <div className='absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-600 mb-1'>{currentRoom.title}</p>
                  <p className='text-lg font-semibold text-gray-900'>{currentRoom.subtitle}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='w-10 h-10 bg-beige-600 rounded-full flex items-center justify-center text-white'
                  aria-label='Next'
                >
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Pagination Dots */}
              <div className='flex justify-center gap-2 mt-4'>
                {inspirationRooms.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === 0 ? 'bg-beige-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
