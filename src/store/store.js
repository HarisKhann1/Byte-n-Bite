import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import cartReducer from './addToCartSlice'

export const store = configureStore({
  reducer: {
    // Define a top-level state field named `auth`, handled by `authSlice`
    auth: authReducer,
    // Define a top-level state field named `cart`, handled by `addToCartSlice`
    cart: cartReducer,
  },
})