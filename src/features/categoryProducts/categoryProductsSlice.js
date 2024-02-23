import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ROOT_URL } from "../..";

export const getCategoryProducts = createAsyncThunk(
  "categories/getCategoryProducts",
  async (categoryId, thunkAPI) => {
    try {
      const res = await axios.get(`${ROOT_URL}/categories/${categoryId}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// createSlice для хранения списка товаров в категории.
const categoryProductsSlice = createSlice({
  name: "categoryProducts",
  initialState: {
    list: {
      category: null,
      data: null,
    },
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoryProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategoryProducts.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getCategoryProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default categoryProductsSlice.reducer;
