import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],  // Array to store the dishes added to the cart
};

// Create a slice for managing the cart
const addToCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action to add a dish to the cart
    addToCart: (state, action) => {
      const newDish = action.payload;
      
      // Check if the dish is already in the cart
      const existingDish = state.cart.find(dish => dish.id === newDish.id);
      
      if (existingDish) {
      console.log(`1`);
        // If dish exists, increase the quantity
        existingDish.quantity += 1;
      } else {
        // If dish doesn't exist, add a new entry with quantity 1
        state.cart.push({ ...newDish, quantity: 1 });
      }
    },
    
    // Action to remove a dish from the cart
    removeFromCart: (state, action) => {
      const dishId = action.payload;
      state.cart = state.cart.filter(dish => dish.id !== dishId);
    },
    
    // Action to update the quantity of a dish in the cart
    increaseQuantity: (state, action) => {
      const { id } = action.payload;
      const existingDish = state.cart.find(dish => dish.id === id);
      
      if (existingDish) {
        existingDish.quantity += 1;
      }
    },

    // Action to update the quantity of a dish in the cart
    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const existingDish = state.cart.find(dish => dish.id === id);
      
      if (existingDish) {
        existingDish.quantity -= 1;
      }
    },

    // Action to clear the entire cart
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = addToCartSlice.actions;

// Export the reducer to be used in the store
export default addToCartSlice.reducer;