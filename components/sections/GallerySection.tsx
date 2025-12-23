'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { galleryImages } from '@/lib/data';

export default function GallerySection() {
  return (
    <section id='contact' className='py-20 md:py-28 bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <AnimatedSection className='text-center mb-12'>
          <p className='text-lg text-gray-600 mb-2'>Share your setup with</p>
          <h2 className='text-4xl md:text-5xl font-bold text-beige-600'>#FuniroFurniture</h2>
        </AnimatedSection>

        {/* Masonry Grid */}
        <div className='columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6'>
          {galleryImages.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.05}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{ scale: 1.05 }}
                className='mb-4 md:mb-6 rounded-2xl overflow-hidden bg-gray-100 group cursor-pointer'
              >
                <div className='relative aspect-square'>
                  <Image
                    src={item.image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                    sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  />
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
