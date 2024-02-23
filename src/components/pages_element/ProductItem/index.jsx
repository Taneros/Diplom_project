import React, { useEffect, useState } from "react";
import s from "../ProductItem/ProductItem.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROOT_URL } from "../../..";
import { getRelatedProducts } from "../../../features/products/productsSlice";
import { addItemToCart } from "../../../features/user/userSlice";

export default function ProductItem({ data }) {
  
const { id,title,image, price, discont_price } = data;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleAddToCart = (event) => {
    event.stopPropagation();
    dispatch(addItemToCart({ id, title, image, price, discont_price }));
  };

  const handleClickCard = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div onClick={handleClickCard} className={s.category_wrapper}>
      <div className={s.image_container}>
        <div>
          <img className={s.category_img} src={ROOT_URL + image} alt={title} />
          <button
            onClick={(event) => handleAddToCart(event)}
            className={s.addToCartButton}
          >
            Add to Cart
          </button>
          {discont_price !== null && (
            <span className={s.discount_label}>
              {`-${((1 - discont_price / price) * 100).toFixed(0)}%`}
            </span>
          )}
        </div>
      </div>

      <div className={s.content_wrapper}>
        <p className={s.category_title} title={title}>
          {title}
        </p>
        {discont_price !== null && (
          <div className={s.price}>
            <span className={s.discounted_price}>{`$${discont_price} `}</span>
            <span className={s.original_price}>{`$${price}`}</span>
          </div>
        )}
        {discont_price === null && (
          <div className={s.price}>
            <span className={s.normal_price}>{`$${price}`}</span>
          </div>
        )}
      </div>
    </div>
  );
}
