import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, Product } from '../../types/product'

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

// Cart reducers update quantities by product ID; Redux Toolkit applies these immutably.
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id,
      )

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ product: action.payload, quantity: 1 })
      }
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(
        (cartItem) => cartItem.product.id === action.payload,
      )
      if (item) item.quantity += 1
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(
        (cartItem) => cartItem.product.id === action.payload,
      )
      if (!item) return

      if (item.quantity === 1) {
        state.items = state.items.filter(
          (cartItem) => cartItem.product.id !== action.payload,
        )
      } else {
        item.quantity -= 1
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload,
      )
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
