import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cartItems: [],
  },

  reducers: {
    addToCart: (state, action) => {
      const exist = state.cartItems.find(
        (item) => item._id === action.payload._id,
      );

      if (!exist) {
        state.cartItems.push(action.payload);
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );
    },

    clearCart : (state)=>{
      state.cartItems = []
    }
  },
});

export const { addToCart, removeToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
