import React, { useState } from "react";
import s from '../AllProducts/AllProducts.module.css'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROOT_URL } from "../../..";

export default function AllProducts({ data: {id, title, image, price, discont_price}}) {

// export default function AllProducts({
//   title,
//   products = [],
//   id,
//   price,
//   discont_price,
// }) {
  //-----
  const { list } = useSelector(({ products }) => products);
  console.log("list", list);
 
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  // const handleAddToCart = () => {
  //   // Добавление товара в корзину
  // };
  
  return (
    <Link to={`/products/${id}`} key={id} className={s.product}>
    <div className={s.category_wrapper} key={id} 
    onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {/* {list.map(({ id, image, title, discont_price, price }) => ( */}
        <div key={id} className={s.image_container}>
          <div>
            <img
              className={s.category_img}
              src={ROOT_URL + image}
              alt={title}
            />
      <button
        className={`${s.addToCartButton} ${isHovered ? s.visible : s.hidden}`}
        // onClick={handleAddToCart}
      >
        Add to Cart
      </button>
            {/* <Link to={`/products/${id}`} key={id} className={s.product}> */}
              {discont_price !== null && (
                <span className={s.discount_label}>
                  {`-${((1 - discont_price / price) * 100).toFixed(0)}%`}
                </span>
              )}
            {/* </Link> */}

    
          </div>
        </div>
      {/* ))} */}
      <div className={s.content_wrapper}  >
        <p className={s.category_title} title={`${title}`}>
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
    </Link>
  );
}
