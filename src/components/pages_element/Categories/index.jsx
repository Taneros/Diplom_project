import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import style from "../../../styles/Styles.module.css";
import s from "./Categories.module.css";
// import { fetchCategories } from "../../../asyncActions/products";
import AllProductsBtn from "../../UI/AllProductsBtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROOT_URL } from "../../..";

export default function Categories({ showQuantityCategories }) {
  const { list } = useSelector(({ categories }) => categories);

  let slicedCategories = list;

  if (showQuantityCategories !== 0) {
    slicedCategories = list.slice(0, showQuantityCategories);
  }

  return (
    <div className={`${s.wrapper} container`}>
      <div className={s.title_btn}>
        <h2 className={s.title}>Categories</h2>

        {showQuantityCategories && (
          <div className={s.category_line_container}>
            <div className={s.categories_line}></div>
            <Link to="/categories">
              <AllProductsBtn buttonText="All categories" />
            </Link>
          </div>
        )}
      </div>

      {
        <div className={s.category_container}>
          {slicedCategories.map(({ id, title, image }) => (
            <Link to={`/products/categories/${id}`} key={id} className={s.item}>
              <div className={s.category_wrapper} key={`${id}`}>
                <img
                  className={s.category_img}
                  src={`${ROOT_URL}${image}`}
                  alt={`${title}`}
                />
                <p className={s.category_title}>{`${title}`} </p>
              </div>
            </Link>
          ))}
        </div>
      }

      {showQuantityCategories && (
        <div className={s.btn__media}>
          <Link to="/categories">
            <AllProductsBtn buttonText="All categories" />
          </Link>
        </div>
      )}
    </div>
  );
}
