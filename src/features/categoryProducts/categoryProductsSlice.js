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
    // filters: {
    //   search: "",
    //   priceRange: { min: null, max: Infinity },
    //   category: false,
    // },
    // sorting: "default",
    isLoading: false,
  },
  reducers: {},
  // reducers: {
  //   setSearchFilter: (state, action) => {
  //     state.filters.search = action.payload.trim().toLowerCase();
  //   },
  //   setPriceRangeFilter: (state, action) => {
  //     state.filters.priceRange = action.payload;
  //   },
  //   setSorting: (state, action) => {
  //     state.sorting = action.payload;
  //   },
  //   setCategoryFilters: (state, action) => {
  //     state.filters.category = action.payload;
  //   },
  // },
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

// export const selectFilteredProducts = (state) => {
//   const { list, filters, sorting } = state.categoryProducts; //change products to categoryProducts

//   // Преобразование объекта list в массив
//   const productList = list.data || [];

//   let filteredProducts = [...productList].sort((a, b) => {
//     const priceA = a.discont_price !== null ? a.discont_price : a.price;
//     const priceB = b.discont_price !== null ? b.discont_price : b.price;
//     return priceA - priceB;
//   });

//   if (filters && filters.search !== "") {
//     filteredProducts = filteredProducts.filter((product) =>
//       product.title.toLowerCase().includes(filters.search)
//     );
//   }

//   if (filters && filters.category) {
//     filteredProducts = filteredProducts.filter((product) =>
//       Boolean(product.discont_price)
//     );
//   }

//   if (
//     (filters && filters.priceRange.min !== null) ||
//     filters.priceRange.max !== null
//   ) {
//     filteredProducts = filteredProducts.filter(
//       (product) =>
//         product.price >= filters.priceRange.min &&
//         product.price <= filters.priceRange.max
//     );
//   }

//   if (sorting === "newest") {
//     filteredProducts.sort(
//       (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
//     );
//   } else if (sorting === "price-high-low") {
//     filteredProducts.sort((a, b) => {
//       const priceA = a.discont_price !== null ? a.discont_price : a.price;
//       const priceB = b.discont_price !== null ? b.discont_price : b.price;
//       return priceB - priceA;
//     });
//   } else if (sorting === "price-low-high") {
//     filteredProducts.sort((a, b) => {
//       const priceA = a.discont_price !== null ? a.discont_price : a.price;
//       const priceB = b.discont_price !== null ? b.discont_price : b.price;
//       return priceA - priceB;
//     });
//   }

//   return filteredProducts;
// };

// export const {
//   setSearchFilter,
//   toggleCategoryFilter,
//   setCategoryFilters,
//   setPriceRangeFilter,
//   setSorting,
//   getRelatedProducts,
// } = categoryProductsSlice.actions;

// //--
