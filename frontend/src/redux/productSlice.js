import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../baseURL/baseUrl";

const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const res = await fetch(`${baseURL}/product`);
  return res.json();
});

const productSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.items = action.payload),
          (state.error = null));
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        ((state.loading = false),
          (state.error = action.error || "Error in fetching the products"));
      });
  },
});

export default productSlice.reducer;
