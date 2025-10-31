"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem, Product } from "./types"

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
              ),
            }
          }
          return {
            items: [...state.items, { ...product, quantity }],
          }
        })
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        }))
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: "coffee-cart-storage",
    },
  ),
)
