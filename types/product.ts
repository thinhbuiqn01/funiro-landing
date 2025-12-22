export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  video?: string
  badge?: 'new' | 'discount'
  discount?: number
}

