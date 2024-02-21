import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  clearCart,
  decrementQuantity,
  deleteProduct,
  incrementQuantity
} from "../../features/user/userSlice";
import { ROOT_URL } from "../..";
import { useForm } from "react-hook-form";
import s from "./CartPage.module.css";
import { IoClose } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import AllProductsBtn from "../../components/UI/AllProductsBtn";
import { Link } from "react-router-dom";

export default function CartPage() {

  //form
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
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

      cart: cart.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice,
      totalCount,
    };
    console.log(formData, "formData...");

    reset(); // Сбрасываем значения формы

    dispatch(clearCart());
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

  // const calculateTotalPrice = (cart) => {
  //   // return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  //   cart.reduce((total, item) => {
  //     return (
  //       total +
  //       (item.discont_price !== null
  //         ? item.discont_price * item.count
  //         : item.price * item.count)
  //     );
  //   }, 0);
  // };

  const calculateTotalCount = (cart) => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleIncrement = (itemId) => {
    dispatch(incrementQuantity({ id: itemId }));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementQuantity({ id: itemId }));
  };

const handleDeleteProduct = ( itemId ) => {
  dispatch(deleteProduct({ id: itemId }))
}
  // Общая стоимость товаров в корзине
  const totalPrice = cart.reduce((total, item) => {
    return (total + (item.discont_price !== null
        ? item.discont_price * item.quantity
        : item.price * item.quantity)
    );
  }, 0).toFixed(2);

  //const roundedTotalPrice = Math.round(totalPrice * 100) / 100; // Округление до двух знаков после запятой


  const totalCount = calculateTotalCount(cart);
  console.log(cart, "cart....");

 

 
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
         <div className={s.congratulations_overlay}>
        <div className={s.congratulations_window}>
          <h3>Congratulations!</h3>
          <div className={s.congratulations_text}>
          <p>Your order has been successfully placed on the website.</p>
          <p>A manager will contact you shortly to confirm your order.</p>
          </div>
          <button className={s.close_btn} onClick={handleCloseCongratulations}> <CgClose className={s.congratulations_icons} /></button>
        </div>
        </div>
      )}
   <div className={s.title_btn}>
      <h2>Shopping cart</h2>

      <div className={s.category_line_container}>
            <div className={s.categories_line}></div>
            <Link to='/products/all'>
              <AllProductsBtn buttonText="Back to the store" className={s.allProductBtn}/>
            </Link>
          </div>
      </div>
      {cart.length === 0 && (
 <div className={s.continue__wrapper}>
 <p>Looks like you have no items in your basket currently.</p>
 <Link to='/'>
 <button className={s.continue__btn}>Continue Shopping</button>
 </Link>
</div>

      )}
     

      <div className={s.wrapper__content}>
        <div className={s.container__products}>
          {cart.map((item) => (
            <div key={item.id} className={s.container}>
              <div className={s.container__image}>
                <img src={ROOT_URL + item.image} alt={item.title} />
              </div>
              <div className={s.product__info}>
               
                <div className={s.title}>
                <h3 >{item.title}</h3>
                <IoClose className={s.icons} onClick={ () => handleDeleteProduct(item.id)}/>
                </div>
      <div className={s.count__container}>
                <div>
                  <div className={s.count__wrapper}>
                    <button
                      className={s.count_btn}
                      onClick={() => handleDecrement(item.id, item.quantity)}
                    >
                      -
                    </button>
                    <div className={s.count}>{item.quantity}</div>
                    <button
                      className={s.count_btn}
                      onClick={() => handleIncrement(item.id, item.quantity)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {item.discont_price !== null && (
                  <div className={s.price}>
                    <span
                      className={s.discounted_price}
                    >{`$${item.discont_price} `}</span>
                    <span className={s.original_price}>{`$${item.price}`}</span>
                  </div>
                )}
                {item.discont_price === null && (
                  <div className={s.price}>
                    <span className={s.normal_price}>{`$${item.price}`}</span>
                  </div>
                )}
                {/* <button onClick={() => handleAddToCart(item)}>
                  Add one more{" "}
                </button> */}
               
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <form
            onSubmit={handleSubmit(handleDiscountSubmit)}
            className={s.form}
          >
            <div className={s.orders__details}>
              <h3>Order details</h3>
              {/* <h3>{totalCount} items</h3> */}
              <span className={s.items}>{cart.length} items</span>
              <div className={s.total_price__wrapper}>
                <span className={s.total__price}>Total</span>
                <span className={s.price__counter}>${totalPrice}</span>
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

              <button
                type="submit"
                disabled={isSubmitting}
                className={s.button}
              >
                Order
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
