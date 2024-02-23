import React, { useEffect, useState } from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchAllProducts,
//   fetchCategoryProducts,
// } from "../../asyncActions/products";
import s from "./ProductsPage.module.css";
import ProductItem from "../../components/pages_element/ProductItem";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FilterPanel from "../../components/pages_element/FilterPanel";
import { selectFilteredProducts } from "../../features/products/productsSlice";

export default function ProductsPage() {
  const productList = useSelector(selectFilteredProducts);

  return (
    <div className={`${s.wrapper} container`}>
      <div className={s.title}>
        <h2>All products</h2>
      </div>
      <FilterPanel />

      <div className={s.category_container}>
        {productList.length > 0 &&
          productList.map((elem) => (
            <ProductItem
              data={elem}
              key={elem.id + elem.title}
            />
          ))}
        {productList.length === 0 && <div>Sorry no products</div>}
      </div>
    </div>
  );
}
