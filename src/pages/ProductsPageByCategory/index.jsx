import React, { useEffect } from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchAllProducts,
//   fetchCategoryProducts,
// } from "../../asyncActions/products";
import s from "./ProductsPageByCategory.module.css";
import ProductItem from "../../components/pages_element/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FilterPanel from "../../components/pages_element/FilterPanel";
import { getCategoryProducts } from "../../features/categoryProducts/categoryProductsSlice.js";

export default function ProductsPageByCategory() {
  const { id } = useParams();

  const { list, loading } = useSelector((state) => state.categoryProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(getCategoryProducts(id));
  }, [dispatch, id]);

  if (!list.category || loading) {
    return <div> Loading ... </div>;
  }

  const { category, data } = list;

  return (
    <>
      <div className={`${s.wrapper} container`}>
        <FilterPanel />

        <h2>{category.title}</h2>

        <div className={s.category_container}>
          {data.length > 0 &&
            data.map((elem) => (
              <ProductItem data={elem} key={elem.id + elem.title} />
            ))}
          {data.length === 0 && <div>Sorry no products</div>}
        </div>
      </div>
    </>
  );
}
