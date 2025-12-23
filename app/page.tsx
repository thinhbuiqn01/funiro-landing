import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import BrowseRangeSection from '@/components/sections/BrowseRangeSection';
import ProductsSection from '@/components/sections/ProductsSection';
import InspirationSection from '@/components/sections/InspirationSection';
import GallerySection from '@/components/sections/GallerySection';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Header />
      <HeroSection />
      <BrowseRangeSection />
      <ProductsSection />
      <InspirationSection />
      <GallerySection />
      <Footer />
    </main>
  );
}
