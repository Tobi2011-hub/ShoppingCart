import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
  // Register feature reducers here so components can access their state by key.
  reducer: {
    cart: cartReducer,
  },
})

// Derive these types from the configured store to keep selectors and dispatch typed.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
