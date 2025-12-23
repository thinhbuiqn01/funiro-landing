'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';
import { products } from '@/lib/data';

export default function ProductsSection() {
  return (
    <section id='products' className='py-20 md:py-28 bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <AnimatedSection className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>Our Products</h2>
        </AnimatedSection>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12'>
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <AnimatedSection className='text-center'>
          <Button variant='outline' size='lg'>
            Show More
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
