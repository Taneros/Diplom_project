import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "./categories/categoriesSlice";
import productsSlice from "./products/productsSlice";
import apiSlice from "./api/apiSlice";

// import { type } from "@testing-library/user-event/dist/type";
// import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        products: productsSlice,
        singleProduct: apiSlice,
        //  [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // //  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware(type)),
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(apiSlice.middleware),
    
    // devTools: true,
})