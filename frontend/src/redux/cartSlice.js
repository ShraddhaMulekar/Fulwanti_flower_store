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
        state.cartItems.push({ ...action.payload, quantity: 1 });
      } else {
        exist.quantity += 1;
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((p) => p._id === id);
      if (item) {
        item.quantity = quantity < 1 ? 1 : quantity;
      }
    },

    clearCart : (state)=>{
      state.cartItems = []
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
