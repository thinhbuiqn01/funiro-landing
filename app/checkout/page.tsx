'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ShippingForm from '@/components/checkout/ShippingForm'
import PaymentForm from '@/components/checkout/PaymentForm'
import { useCartStore } from '@/store/useCartStore'
import { useOrderStore } from '@/store/useOrderStore'
import { ShippingAddress, PaymentInfo, OrderItem } from '@/types/order'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const subtotal = useCartStore((state) => state.getTotalPrice())
  const addOrder = useOrderStore((state) => state.addOrder)
  const [isProcessing, setIsProcessing] = useState(false)

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  })

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'card',
  })

  const shipping = subtotal > 0 ? 5.0 : 0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }))

    addOrder({
      items: orderItems,
      total,
      subtotal,
      shipping,
      tax,
      status: 'processing',
      paymentMethod: paymentInfo.paymentMethod,
      shippingAddress,
    })

    clearCart()
    setIsProcessing(false)
    router.push(`/order-success?orderId=${Date.now()}`)
  }

  if (items.length === 0) {
    return (
      <main className='min-h-screen'>
        <Header />
        <div className='pt-20'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <div className='text-center py-20'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>Your cart is empty</h2>
              <p className='text-gray-600 mb-8'>Add items to your cart before checkout.</p>
              <Link href='/cart'>
                <Button size='lg'>View Cart</Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className='min-h-screen'>
      <Header />
      <div className='pt-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-8'>Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <div className='lg:col-span-2 space-y-8'>
                {/* Shipping Address */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='bg-white border border-gray-200 rounded-2xl p-6'
                >
                  <h2 className='text-2xl font-bold text-gray-900 mb-6'>Shipping Address</h2>
                  <ShippingForm address={shippingAddress} onChange={setShippingAddress} />
                </motion.div>

                {/* Payment */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className='bg-white border border-gray-200 rounded-2xl p-6'
                >
                  <h2 className='text-2xl font-bold text-gray-900 mb-6'>Payment</h2>
                  <PaymentForm paymentInfo={paymentInfo} onChange={setPaymentInfo} />
                </motion.div>
              </div>

              {/* Order Summary */}
              <div className='lg:col-span-1'>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className='bg-white border border-gray-200 rounded-2xl p-6 sticky top-24'
                >
                  <h2 className='text-2xl font-bold text-gray-900 mb-6'>Order Summary</h2>

                  <div className='space-y-4 mb-6'>
                    <div className='space-y-3'>
                      {items.map((item) => (
                        <div key={item.id} className='flex justify-between text-sm'>
                          <span className='text-gray-600'>
                            {item.name} x{item.quantity}
                          </span>
                          <span className='text-gray-900 font-medium'>
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className='border-t border-gray-200 pt-4 space-y-2'>
                      <div className='flex justify-between text-gray-600'>
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className='flex justify-between text-gray-600'>
                        <span>Shipping</span>
                        <span>{shipping > 0 ? formatPrice(shipping) : 'Free'}</span>
                      </div>
                      <div className='flex justify-between text-gray-600'>
                        <span>Tax</span>
                        <span>{formatPrice(tax)}</span>
                      </div>
                      <div className='border-t border-gray-200 pt-4'>
                        <div className='flex justify-between text-xl font-bold text-gray-900'>
                          <span>Total</span>
                          <span>{formatPrice(total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type='submit'
                    size='lg'
                    className='w-full'
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}
                  </Button>
                </motion.div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  )
}

