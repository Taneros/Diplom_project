
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    cart: [],
    isLoading: false,
  },
//   reducers: {
//     addItemToCart: (state, { payload }) => {

//       const { id, quantity } = payload;
//       const existingItemIndex = state.cart.findIndex((item) => item.id === id);


//         let newCart = [...state.cart];
//         const found = state.cart.find(({ id }) => id === payload.id)
//         if (existingItemIndex !== -1) {
//           // Увеличиваем количество товара на 1, если он уже есть в корзине
//           state.cart[existingItemIndex].quantity += quantity || 1;
//         } else {
//           // Добавляем новый товар в корзину с начальным количеством 1
//           state.cart.push({ ...payload, quantity:  quantity || 1 });
//         }
//         // if(found){
//         //     newCart = newCart.map((item) => {
//         //         return item.id === payload.id 
//         //         ? {...item, quantity: payload.quantity || item.quantity + 1 } 
//         //         : item;
//         //     } );
//         // } else newCart.push({ ...payload, quantity: payload.quantity || 1 })

//         // state.cart = newCart;
//         console.log('cart update  ...', newCart)
//     },
//     updateCartItemQuantity: (state, action) => {
//       const { id, quantity } = action.payload;
//       const item = state.cart.find((item) => item.id === id);
//       if(item) {
//         item.quantity = quantity;
//       }
//     }
//   },
//   incrementQuantity: (state, { payload }) => {
//     const { id } = payload;
//     const item = state.cart.find((item) => item.id === id);
//     if (item) {
//       item.quantity +=1;
//     }
//   },
//   decrementQuantity: (state, {payload}) => {
//     const { id } = payload;
//     const item = state.cart.find((item) => item.id === id);
//     if (item && item.quantity > 1) {
//       item.quantity -= 1;
//     }
//   },
// });


// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     currentUser: {},
//     cart: [],
//     isLoading: false,
//     // quantity: ''
//   },
//   reducers: {
//     addItemToCart: (state, { payload }) => {
//       if (!payload || !payload.id) {
//         console.error("Invalid payload for addItemToCart");
//         return;
//       }

//       const { id, quantity = 1, ...rest } = payload;
//       const existingItem = state.cart.find((item) => item.id === id);


//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         state.cart.push({ id, quantity, ...rest });
//       }

//       console.log("Cart updated:", state.cart);
//     },
//     removeItemFromCart: (state, { payload }) => {
//       const { id } = payload;
//       state.cart = state.cart.filter(item => item.id !== id);
//     }
//   },
//   extraReducers: (builder) => {
//     // Обрабатываем action updateCartItemQuantity
//     builder.addCase(updateCartItemQuantity, (state, action) => {
//       const { id, quantity } = action.payload;
//       const item = state.cart.find((item) => item.id === id);
//       if (item) {
//         item.quantity = quantity;
//       }
//     });
//   }
 
// });


reducers: {
  addItemToCart: (state, { payload }) => {
    const { id, quantity } = payload;
    const existingItemIndex = state.cart.findIndex((item) => item.id === id);
    if (existingItemIndex !== -1) {
      state.cart[existingItemIndex].quantity += quantity || 1;
    } else {
      state.cart.push({ ...payload, quantity:  quantity || 1 });
    }
  },
  updateCartItemQuantity: (state, action) => {
    const { id, quantity } = action.payload;
    const item = state.cart.find((item) => item.id === id);
    if(item) {
      item.quantity = quantity;
    }
  },
  incrementQuantity: (state, { payload }) => {
    const { id } = payload;
    const item = state.cart.find((item) => item.id === id);
    if (item) {
      item.quantity +=1;
    }
  },
  decrementQuantity: (state, {payload}) => {
    const { id } = payload;
    const item = state.cart.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    }
  },
},
});

export const { addItemToCart, updateCartItemQuantity, incrementQuantity, decrementQuantity } = userSlice.actions;
export default userSlice.reducer;



