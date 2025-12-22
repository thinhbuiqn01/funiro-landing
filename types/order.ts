export interface Order {
  id: string
  items: OrderItem[]
  total: number
  subtotal: number
  shipping: number
  tax: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  paymentMethod: string
  shippingAddress: ShippingAddress
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface ShippingAddress {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface PaymentInfo {
  cardNumber: string
  cardHolder: string
  expiryDate: string
  cvv: string
  paymentMethod: 'card' | 'paypal' | 'bank_transfer'
}

