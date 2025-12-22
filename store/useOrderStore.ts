import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Order } from '@/types/order'

interface OrderStore {
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void
  getOrderById: (orderId: string) => Order | undefined
  getOrders: () => Order[]
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set({ orders: [...get().orders, newOrder] })
      },
      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId)
      },
      getOrders: () => {
        return get().orders
      },
    }),
    {
      name: 'order-storage',
    }
  )
)

