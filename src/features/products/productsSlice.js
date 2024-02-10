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
        related: [],
        isLoading: false,
    },
    reducers: {
        filterByPrice: (state, { payload }) => {
state.filtered = state.list.filter(({ price }) => price < payload)      //filter by price
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

export const { filterByPrice, getRelatedProducts } = productsSlice.actions

export default productsSlice.reducer