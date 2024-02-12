import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, clearCart, decrementQuantity, incrementQuantity, removeItemFromCart, updateCartItemQuantity } from "../../features/user/userSlice";
import { ROOT_URL } from "../..";
import { useForm } from "react-hook-form";
import s from "./Cartpage.module.css";

export default function CartPage() {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  //form
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues, isSubmitSuccessful, isSubmitting },
    reset,
  } = useForm();

  const handleDiscountSubmit = (data) => {
    const formData = {
      name: data.name,
      phone: data.phone,
      email: data.email,

      cart: cart.map(item => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice, 
      totalCount,

    }
    console.log(formData, 'formData...');

  


    reset(); // Сбрасываем значения формы

    dispatch(clearCart())
       // окно с поздравлением
       setIsSubmitted(true);
       setShowCongratulations(true);
  };

    // для закрытия окна с поздравлениями
    const handleCloseCongratulations = () => {
      setShowCongratulations(false);
    };
  // const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.user.cart);

  const calculateTotalPrice = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const calculateTotalCount  = (cart) => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  const handleIncrement = (itemId) => {
    dispatch(incrementQuantity({id: itemId}));
  };

  //  для уменьшения количества товара в корзине
  const handleDecrement = (itemId) => {
    dispatch(decrementQuantity({id: itemId}));
  };

  // Общая стоимость товаров в корзине
  const totalPrice = calculateTotalPrice(cart);

  const totalCount = calculateTotalCount(cart)
  console.log(cart, "cart....");
  

  const handleAddToCart = (item) => {
    dispatch(addItemToCart(item));
  };

  // const handleDecrement = (itemId, quantity) => {
  //   // Уменьшаем количество товара на 1
  //     if (quantity > 1) {
  //       dispatch(updateCartItemQuantity({ id: itemId, quantity: quantity - 1 }));
  //     }
  // };

  // const handleIncrement = (itemId, quantity) => {
  //   dispatch(updateCartItemQuantity({ id: itemId, quantity: quantity + 1 }));
  // };

  // const handleRemoveItem = (itemId) => {
  //   dispatch(removeItemFromCart({ id: itemId }));
  // };

  return (
    
    <div className={`${s.wrapper} container`}>

{showCongratulations && (
        <div>
          <h2>Congratulations!</h2>
          <p>Your order has been successfully submitted.</p>
          <button onClick={handleCloseCongratulations}>Close</button>
        </div>
      )}

      <h1>Shopping cart</h1>
      <div className={s.wrapper__content}>
      <div className={s.container__products}>
        {cart.map((item) => (
          <div key={item.id} className={s.container}>
              <div className={s.container__image}>
                <img src={ROOT_URL + item.image} alt={item.title} />
              </div>
              <div>
                <h3>{item.title}</h3>

                <div>

                <div className={s.count__wrapper}>
                        <button className={s.count_btn} onClick={() => handleDecrement(item.id, item.quantity)}>-</button>
                        <div className={s.count}>{item.quantity}</div>
                        <button className={s.count_btn} onClick={() => handleIncrement(item.id, item.quantity)}>+</button>
                      </div>
                </div>
                <p>Price : ${item.price}</p>
                <button onClick={() => handleAddToCart(item)}>
                  Add one more{" "}
                </button>
              </div>
           
          </div>
        ))}
        </div>
        {cart.length > 0 && (
        <form onSubmit={handleSubmit(handleDiscountSubmit)} className={s.form}>
          <div>
            <h3>Order details</h3>
            <h3>{totalCount} items</h3>
            <div>
              <h3>Total</h3>
              <span>${totalPrice}</span>
            </div>
          </div>
          <div className={s.labels}>
            <label htmlFor="name">
              <input
                id="name"
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: true,
                  minLength: {
                    value: 2,
                    message: "Name is too short...min length: 2",
                  },
                  maxLength: {
                    value: 20,
                    message: "Name is too long...max length: 20",
                  },
                })}
              />
              <p className={s.form__par}>{errors.name?.message}</p>
            </label>
            <label htmlFor="phone">
              <input
                id="phone"
                type="tel"
                placeholder="Phone number"
                {...register("phone", {
                  required: "The field is required",
                  pattern: {
                    value: /\(?\+\(?49\)?[ ()]?([- ()]?\d[- ()]?){10}/g,
                    message:
                      "Phone number must be with the country code Germany ",
                  },
                })}
              />
              <p className={s.form__par}>{errors.phone?.message}</p>
            </label>

            <label htmlFor="email">
              <input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "The field is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "Email is not correct",
                  },
                })}
              />
              <p className={s.form__par}>{errors.email?.message}</p>
            </label>

            <button type="submit" disabled={isSubmitting} className={s.button}>
              Order
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
