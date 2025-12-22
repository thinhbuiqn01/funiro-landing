import { Product, Category, InspirationRoom, GalleryImage } from '@/types'

export const products: Product[] = [
  {
    id: '1',
    name: 'Syltherine',
    description: 'Stylish cafe chair',
    price: 159.99,
    originalPrice: 229.99,
    image: '/images/products/product-1.jpg',
    images: [
      '/images/products/product-1.jpg',
      '/images/products/product-2.jpg',
      '/images/products/product-3.jpg',
      '/images/products/product-4.jpg',
      '/images/products/product-1.jpg',
    ],
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    badge: 'discount',
    discount: 30,
  },
  {
    id: '2',
    name: 'Leviosa',
    description: 'Stylish cafe chair',
    price: 159.99,
    image: '/images/products/product-2.jpg',
    images: [
      '/images/products/product-2.jpg',
      '/images/products/product-1.jpg',
      '/images/products/product-3.jpg',
      '/images/products/product-4.jpg',
      '/images/products/product-2.jpg',
    ],
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: '3',
    name: 'Lolito',
    description: 'Luxury big sofa',
    price: 449.99,
    originalPrice: 899.99,
    image: '/images/products/product-3.jpg',
    badge: 'discount',
    discount: 50,
  },
  {
    id: '4',
    name: 'Grifo',
    description: 'Night lamp',
    price: 89.99,
    image: '/images/products/product-4.jpg',
  },
  {
    id: '5',
    name: 'Muggo',
    description: 'Small mug',
    price: 9.99,
    image: '/images/products/product-3.jpg',
    badge: 'new',
  },
  {
    id: '6',
    name: 'Pingky',
    description: 'Cute bed set',
    price: 449.99,
    originalPrice: 899.99,
    image: '/images/products/product-3.jpg',
    badge: 'discount',
    discount: 50,
  },
  {
    id: '7',
    name: 'Potty',
    description: 'Minimalist flower pot',
    price: 29.99,
    image: '/images/products/product-3.jpg',
    badge: 'new',
  },
]

export const categories: Category[] = [
  {
    id: '1',
    name: 'Dining',
    image: '/images/categories/category-dining.jpg',
  },
  {
    id: '2',
    name: 'Living',
    image: '/images/categories/category-living.jpg',
  },
  {
    id: '3',
    name: 'Bedroom',
    image: '/images/categories/category-bedroom.jpg',
  },
]

export const inspirationRooms: InspirationRoom[] = [
  {
    id: '1',
    title: 'Bed Room',
    subtitle: 'Inner Peace',
    image: '/images/inspiration/inspiration-1.jpg',
  },
  {
    id: '2',
    title: 'Dining Room',
    subtitle: 'Modern Elegance',
    image: '/images/inspiration/inspiration-2.jpg',
  },
]

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    image: '/images/gallery/gallery-1.jpg',
  },
  {
    id: '2',
    image: '/images/gallery/gallery-2.jpg',
  },
  {
    id: '3',
    image: '/images/gallery/gallery-3.jpg',
  },
  {
    id: '4',
    image: '/images/gallery/gallery-4.jpg',
  },
  {
    id: '5',
    image: '/images/gallery/gallery-5.jpg',
  },
  {
    id: '6',
    image: '/images/gallery/gallery-6.jpg',
  },
  {
    id: '7',
    image: '/images/gallery/gallery-7.jpg',
  },
  {
    id: '8',
    image: '/images/gallery/gallery-8.jpg',
  },
  {
    id: '9',
    image: '/images/gallery/gallery-9.jpg',
  },
]
