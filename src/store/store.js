import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import cartReducer from './addToCartSlice'
import adminAuthReducer from './adminAuthSlice'

export const store = configureStore({
  reducer: {
    // Define a top-level state field named `auth`, handled by `authSlice`
    auth: authReducer,
    // Define a top-level state field named `cart`, handled by `addToCartSlice`
    cart: cartReducer,
    // Define a top-level state field named `adminAuth`, handled by `adminAuthSlice`
    adminAuth: adminAuthReducer,
  },
})