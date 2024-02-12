import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ROOT_URL } from "../..";
import axios from "axios";
import { shuffle } from "../../utils/common";




export const getProducts = createAsyncThunk('products/getProducts',
 async (_, thunAPI) => {
    try {
        const res  = await axios(`${ROOT_URL}/products/all`);
        console.log(res)
        return res.data
    } catch(error) {
        console.log(error);
        return thunAPI.rejectWithValue(error)
    }
 } 
 );
 
const productsSlice = createSlice({
    name: 'categories',
    initialState: {
        list: [],
        filtered: [],
        filters: {
            hasDiscount: null,
            sorted: null,
        },
        related: [],
        isLoading: false,
        minPrice:'',
        maxPrice: '',
    },
    reducers: {
        filterByPrice: (state, action) => {
            state.filters.hasDiscount = action.payload;   
            state.filtered = state.list.filter(({ discont_price }) => action.payload ? discont_price !== null : true)      //filter by price
        },
        sortByDate: (state) => {
            state.list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          },
    
        sortByHighLowPrice: (state) => {
            state.list.sort((a, b) => {
              const priceA = a.discont_price !== null ? a.discont_price : a.price;
              const priceB = b.discont_price !== null ? b.discont_price : b.price;
              return priceB - priceA;
            });
          },
          sortByLowHighPrice: (state) => {
            state.list.sort((a, b) => {
              const priceA = a.discont_price !== null ? a.discont_price : a.price;
              const priceB = b.discont_price !== null ? b.discont_price : b.price;
              return priceA - priceB;
            });
          },
          setMinPrice: (state, action) => {
            state.minPrice = action.payload;
          },
          setMaxPrice: (state, action) => {
            state.maxPrice = action.payload;
          },
          filterByPriceRange: (state) => {
            state.filtered = state.list.filter((item) => {
                const price = item.discont_price !== null ? item.discont_price : item.price;
                const min = state.minPrice !== '' ? parseFloat(state.minPrice) : Number.NEGATIVE_INFINITY;
                const max = state.maxPrice !== '' ? parseFloat(state.maxPrice) : Number.POSITIVE_INFINITY;
                return price >= min && price <= max;
            })
          },

            getRelatedProducts : (state, { payload }) => {
                const list = state.list.filter(({ category: { id } }) => id === payload)
                state.related = shuffle(list)  //in common file
                },
            },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.list = payload;
            state.isLoading = false;
        });
        builder.addCase(getProducts.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const { filterByPrice, getRelatedProducts, sortByDate, sortByHighLowPrice, sortByLowHighPrice, filterByPriceRange, setMaxPrice,setMinPrice} = productsSlice.actions

export default productsSlice.reducer
