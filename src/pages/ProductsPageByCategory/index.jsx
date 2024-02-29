import React, { useEffect } from "react";
import s from "./ProductsPageByCategory.module.css";
import ProductItem from "../../components/pages_element/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FilterPanel from "../../components/pages_element/FilterPanel";
import {
  getCategoryProducts,
  selectFilteredProductsByCategory,
} from "../../features/categoryProducts/categoryProductsSlice.js";

export default function ProductsPageByCategory() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { list, category, isLoading } = useSelector(
    selectFilteredProductsByCategory
  );

  console.log(`ProductsPageByCategory/index.jsx - line: 20 ->> list`, list);

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(getCategoryProducts(id));
  }, [id]);

  if (isLoading) {
    return <div> Loading ... </div>;
  }

  if (!isLoading)
    return (
      <>
        <div className={`${s.wrapper} container`}>
          <div className={s.title}>
            <FilterPanel />
            {!isLoading && category && <h2>{category.title}</h2>}
          </div>

          <div className={s.category_container}>
            {list.length > 0 &&
              list.map((elem) => (
                <ProductItem data={elem} key={elem.id + elem.title} />
              ))}
            {!isLoading && (!list || list.length === 0) && (
              <div>Sorry no products</div>
            )}
          </div>
        </div>
      </>
    );
}
