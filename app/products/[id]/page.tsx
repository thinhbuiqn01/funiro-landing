import { notFound } from 'next/navigation'
import { products } from '@/lib/data'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductImageGallery from '@/components/product-detail/ProductImageGallery'
import ProductInfo from '@/components/product-detail/ProductInfo'
import VideoDemo from '@/components/product-detail/VideoDemo'
import ReviewsSection from '@/components/product-detail/ReviewsSection'
import CommentsSection from '@/components/product-detail/CommentsSection'

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  const productImages = product.images || [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
  ]

  return (
    <main className='min-h-screen'>
      <Header />
      <div className='pt-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          {/* Product Detail Section */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
            <ProductImageGallery images={productImages} productName={product.name} />
            <ProductInfo product={product} />
          </div>

          {/* Video Demo */}
          {product.video && <VideoDemo videoUrl={product.video} productName={product.name} />}

          {/* Reviews */}
          <ReviewsSection product={product} />

          {/* Comments */}
          <CommentsSection product={product} />
        </div>
      </div>
      <Footer />
    </main>
  )
}
