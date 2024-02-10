import React, { useEffect } from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchAllProducts,
//   fetchCategoryProducts,
// } from "../../asyncActions/products";
import s from "./ProductsPage.module.css";
import AllProducts from "../../components/pages_element/AllProducts";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FilterPanel from "../../components/pages_element/FilterPanel";

export default function ProductsPage() {
  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [])

  const { list } = useSelector(({ products }) => products);


  // const productsCategoriesById = useSelector((store) => {
  //   if (id) {
  //     return store.productCategoriesById.productsByCategoryId;
  //   } else {
  //     return store.products.products;
  //   }
  // });
  // const { id } = useParams();

  // const productsCategoriesById = useSelector((store) => {
  //   if (id) {
  //     return store.productCategoriesById.productsByCategoryId;
  //   } else {
  //     return store.products.products;
  //   }
  // });

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (id) {
  //     dispatch(fetchCategoryProducts(id));
  //   } else {
  //     dispatch(fetchAllProducts);
  //   }
  // }, [id]);

  //   if (!id) {
  //     return (
  //       <div className={`${s.wrapper} container`}>
  //         <FilterPanel />
  //         <h2>All products</h2>

  //         <div className={s.category_container}>
  //           {productsCategoriesById.length > 0 &&
  //             productsCategoriesById.map((elem) => (
  //               <AllProducts data={elem} key={elem.id + elem.title} />
  //             ))}
  //           {productsCategoriesById.length === 0 && <div>Sorry no products</div>}
  //         </div>
  //       </div>
  //     );
  //   }

  //   return (
  //     (<div className={`${s.wrapper} container`}>
  //       <FilterPanel />
  //       <h2>{productsCategoriesById.category.title}</h2>

  //       <div className={s.category_container}>
  //         {productsCategoriesById.data.length > 0 &&
  //           productsCategoriesById.data.map((elem) => (
  //             <AllProducts data={elem} key={elem.id + elem.title} />
  //           ))}
  //         {productsCategoriesById.data.length === 0 && (
  //           <div>Sorry no products</div>
  //         )}
  //       </div>
  //     </div>)
  //   );

  return (
    <div className={`${s.wrapper} container`}>
      <h2>All products</h2>

      <FilterPanel />
      <div className={s.category_container}>
        {list.length > 0 &&
          list.map((elem) => (
            <AllProducts 
              data={elem}
              key={elem.id + elem.title}
              products={list}
            />
          ))}
        {list.length === 0 && <div>Sorry no products</div>}
      </div>
    </div>
  );
}
