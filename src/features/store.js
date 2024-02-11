import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "./categories/categoriesSlice";
import productsSlice from "./products/productsSlice";
import apiSlice from "./api/apiSlice";
import categoryProductsSlice from "./categoryProducts/categoryProductsSlice";
import userSlice from "./user/userSlice";


// import { type } from "@testing-library/user-event/dist/type";
// import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        products: productsSlice,
        singleProduct: apiSlice,
        user: userSlice,
        categoryProducts: categoryProductsSlice,
        // checkbox: checkboxSlice,
        // getRelatedProducts: getRelatedProducts ,
        //  [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // //  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware(type)),
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(apiSlice.middleware),
    
    // devTools: true,
})