import {configureStore} from "@reduxjs/toolkit";
import productReducer from "../redux/productSlice";
import cartReducer from "../redux/cartSlice"
import authReducer from "../redux/authSlice"

export const store = configureStore({
  reducer: {
    auth : authReducer,
    products: productReducer,
    cart: cartReducer,
  },
});