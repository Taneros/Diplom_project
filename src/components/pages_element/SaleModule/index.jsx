import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import s from "./SaleModule.module.css";
import { useSelector } from "react-redux";
import AllProductsBtn from "../../UI/AllProductsBtn";

// import { fetchAllProducts } from "../../../asyncActions/products";
import { Link } from "react-router-dom";
import { ROOT_URL } from "../../..";

export default function SaleModule({ showQuantitySaleItems, id }) {
  const { list } = useSelector(({ products }) => products);

  let saleProducts = list.filter((item) => item.discont_price !== null); // []

  if (showQuantitySaleItems) {
    saleProducts = saleProducts
      .sort((a, b) => {
        // Рассчитываем процент скидки для каждого товара
        const discountA = (a.discont_price / a.price) * 100;
        const discountB = (b.discont_price / b.price) * 100;
        // Сравниваем товары по проценту скидки
        return discountA - discountB;
      })
      .slice(0, showQuantitySaleItems);
  }

  //button hover
  // const [isHovered, setIsHovered] = useState(null);
  // const handleMouseEnter = (id) => {
  //   setIsHovered(id);
  // };
  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };

  return (
    <div className={`${s.wrapper} container`}>
      <div className={s.title_btn}>
        <h2 className={s.title}>Sale</h2>
        {showQuantitySaleItems && (
          <div className={s.category_line_container}>
            <div className={s.categories_line}></div>
            <Link to="/sales">
              {" "}
              <AllProductsBtn buttonText="All sales" />
            </Link>{" "}
          </div>
        )}
      </div>

      <div className={s.category_container}>
        {saleProducts.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={`${product.id}`}
            className={s.product}
          >
            <div
              className={s.category_wrapper}
              key={`${product.id}`}
              // onMouseEnter={() => handleMouseEnter(id)}
              // onMouseLeave={handleMouseLeave}
            >
              <div className={s.image_container}>
                <img
                  className={s.category_img}
                  src={`${ROOT_URL}${product.image}`}
                  alt={`${product.title} || ${product.id}`}
                />
                <button
                  className={s.addToCartButton}
                >
                  Add to Cart
                </button>
                <span className={s.discount_label}>
                  {`- ${(
                    (1 - product.discont_price / product.price) *
                    100
                  ).toFixed(0)}%`}
                </span>
              </div>

              <div className={s.content_wrapper}>
                <p className={s.category_title} title={`${product.title}`}>
                  {`${product.title}`}{" "}
                </p>
                <div className={s.price}>
                  <span
                    className={s.discounted_price}
                  >{`$${product.discont_price} `}</span>
                  <span
                    className={s.original_price}
                  >{`$${product.price}`}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
