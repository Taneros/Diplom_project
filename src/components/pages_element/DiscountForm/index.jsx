import React, { useState } from "react";
import image from "../../media/discount_img.png";
import { useForm } from "react-hook-form";

// import style from '../../../styles/Styles.module.css'
import s from "./DiscountForm.module.css";

export default function DiscountForm() {
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


  return (
    <div className="container">
      <div className={s.container}>
        <h2 className={s.h2}>5% off on the first order</h2>

        <div className={s.discount_wrapper}>
          <img src={image} alt="discount" />
          <div className={s.wrapper__form}>
       
            <form
              className={s.form}
              onSubmit={handleSubmit(handleDiscountSubmit)}>
              <label htmlFor="name">
                <input 
                id='name'
                type="text" 
                placeholder="Name" 
                {...register('name', {
                    required: true,
                    minLength: {value: 2, message: 'Name is too short...min length: 2'},
                    maxLength: {value: 20, message: "Name is too long...max length: 20" }
                })}
                />
                 <p className={s.form__par}>{errors.name?.message}</p>
              </label >
              <label htmlFor="phone">
                <input 
                id="phone"
                type="tel"
                placeholder="Phone number" 
               
                {...register('phone', {
                    required: 'The field is required',
                    pattern: {
                        value: /\(?\+\(?49\)?[ ()]?([- ()]?\d[- ()]?){10}/g,
                        message: 'Phone number must be with the country code Germany '
                    }
                })}
                />
                 <p className={s.form__par}>{errors.phone?.message}</p>
              </label>
              
             
              <label htmlFor="email">
                <input 
                id="email"
                type="email" 
                placeholder="Email" 
                {...register('email', {
                    required: 'The field is required',
                    pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: 'Email is not correct'
                    }
                })}
                
                />
                 <p className={s.form__par}>{errors.email?.message}</p>
              </label>
             
              <button type="submit" disabled={isSubmitting} className={s.button}>Get a discount</button>
              {/* <p className={s.form__end}>{isSubmitSuccessful && 'Thank you!'  }</p> */}
            </form>
          </div>
        </div>
        <div className={s.background__image}>
        <img src={image} alt="discount" />
        </div>
      </div>
    </div>
  );
}
