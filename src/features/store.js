import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "./categories/categoriesSlice";
import productsSlice from "./products/productsSlice";
import apiSlice from "./api/apiSlice";
import categoryProductsSlice from "./categoryProducts/categoryProductsSlice";
import userSlice from "./user/userSlice";



// Middleware для сохранения состояния в localStorage
// const saveToLocalStorage = store => next => action => {
//     const result = next(action);
//     localStorage.setItem('reduxState', JSON.stringify(store.getState()));
//     return result;
//   };


export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        products: productsSlice,
        singleProduct: apiSlice,
        user: userSlice,
        categoryProducts: categoryProductsSlice,
    },
    // middleware: [...getDefaultMiddleware(), saveToLocalStorage]
})