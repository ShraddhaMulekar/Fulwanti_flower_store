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

    removeToCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item_id !== action.payload,
      );
    },
  },
});

export const { addToCart, removeToCart } = cartSlice.actions;
export default cartSlice.reducer;
