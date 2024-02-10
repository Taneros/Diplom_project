
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// export const ROOT_URL = 'http://localhost:3333'

// export const userSlice = createAsyncThunk(
//   "users/createUser",
//   async (payload, thunAPI) => {
//     try {
//       const res = await axios.post(`${ROOT_URL}/users`, payload);
//       return res.data;
//     } catch (error) {
//       console.log(error);
//       return thunAPI.rejectWithValue(error);
//     }
//   }
// );

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    cart: [],
    isLoading: false,
  },
  reducers: {
    addItemToCart: (state, { payload }) => {
        let newCart = [...state.cart];
        const found = state.cart.find(({ id }) => id === payload.id)

        if(found){
            newCart = newCart.map((item) => {
                return item.id === payload.id 
                ? {...item, quantity: payload.quantity || item.quantity + 1 } 
                : item;
            } );
        } else newCart.push({ ...payload, quantity: 1 })

        state.cart = newCart;
        console.log('cart   ...', newCart)
    },
  },

//   extraReducers: (builder) => {
//     builder.addCase(createUser.fulfilled, (state, { payload }) => {
//       state.currentUser = payload;
//     });
//   },
});

export const { addItemToCart } = userSlice.actions;
export default userSlice.reducer;
