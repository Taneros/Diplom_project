import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart } from '../../features/user/userSlice';

export default function CartPage() {
  
  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [])

  const dispatch = useDispatch();


  const cart = useSelector((state) => state.user.cart)


console.log(cart, 'cart....')

  const handleAddToCart = (item) => {
    dispatch(addItemToCart(item))
  };

  return (
    <div>
      <h1>Cart</h1>
     {
      cart.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>Price : ${item.price}</p>
          <button onClick={() => handleAddToCart(item)}>Add one more </button>        
        </div>
      ))
     }
    </div>
  )
}
