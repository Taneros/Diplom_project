import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../features/user/userSlice";
import { ROOT_URL } from "../..";
import { useForm } from "react-hook-form";
import s from "./Cartpage.module.css";

export default function CartPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //form
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues, isSubmitSuccessful, isSubmitting },
    reset,
  } = useForm();

  const handleDiscountSubmit = (data) => {
    console.log(data);
    reset();
  };


  const cart = useSelector((state) => state.user.cart);

  console.log(cart, "cart....");

  const handleAddToCart = (item) => {
    dispatch(addItemToCart(item));
  };


  return (
    <div className={`${s.wrapper} container`}>
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
                <p>Price : ${item.price}</p>
                <button onClick={() => handleAddToCart(item)}>
                  Add one more{" "}
                </button>
              </div>
           
          </div>
        ))}
        </div>
        <form onSubmit={handleSubmit(handleDiscountSubmit)} className={s.form}>
          <div>
            <h3>Order details</h3>
            <h3>3 items</h3>
            <div>
              <h3>Total</h3>
              <span>$200</span>
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
      </div>
    </div>
  );
}
