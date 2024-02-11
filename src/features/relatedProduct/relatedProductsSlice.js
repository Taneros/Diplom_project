// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { ROOT_URL } from "../..";


// export const getRelatedProducts = createAsyncThunk(

//     async (id, thunkAPI) => {
//         try {
//             const res = await axios(`${ROOT_URL}/products/all?category=${id}`);
//       // Фильтруем товары, у которых есть скидка
//       const filteredProducts = res.data.filter(product => product.discont_price !== null);
//       return filteredProducts;
//         } catch (error) {
//             console.log(error);
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// );