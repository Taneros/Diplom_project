import React, { useEffect, useState } from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchAllProducts,
//   fetchCategoryProducts,
// } from "../../asyncActions/products";
import s from "./ProductsPage.module.css";
import ProductItem from "../../components/pages_element/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FilterPanel from "../../components/pages_element/FilterPanel";
import {
  filterByPrice,
  filterByPriceRange,
  filterFromTo,
  setMaxPrice,
  setMinPrice,
  sortByDate,
  sortByHighLowPrice,
  sortByLowHighPrice,
} from "../../features/products/productsSlice";

export default function ProductsPage() {
  const { list, filtered } = useSelector(({ products }) => products);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("by default");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const filteredList = isChecked  
  ? list.filter((item) => item.discont_price !== null)
    : list;

  //sorted
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option === "newest") {
      dispatch(sortByDate(option));
    } else if (option === "price: high-low") {
      dispatch(sortByHighLowPrice(option));
    } else if (option === "price: low-high") {
      dispatch(sortByLowHighPrice(option));
    } else {
      return 0;
    }
  };

  //price filter from ..to

  const minPrice = useSelector((state) => state.products.minPrice);
  const maxPrice = useSelector((state) => state.products.maxPrice);

  //console.log(minPrice, 'minPrice',maxPrice, 'maxPrice' )

  const handleMinPriceChange = (e) => {
    dispatch(setMinPrice(e.target.value));
    dispatch(filterByPriceRange());
  };

  const handleMaxPriceChange = (e) => {
    dispatch(setMaxPrice(e.target.value));
    dispatch(filterByPriceRange());
  };

  const handleFromToPrice = (priceFrom, priceTo) => {
    const from = parseFloat(priceFrom);
    const to = parseFloat(priceTo);
    dispatch(filterFromTo({ from, to }));
  };
  
  return (
    <div className={`${s.wrapper} container`}>
     
<div className={s.title}>     
   
       <h2>All products</h2>
       </div>
       <FilterPanel
        onCheckboxChange={handleCheckboxChange}
        onOptionChange={handleOptionChange}
        handleMinPriceChange={handleMinPriceChange}
        handleMaxPriceChange={handleMaxPriceChange}
        minPrice={minPrice}
        maxPrice={maxPrice}

        handleFromToPrice={(priceTo , priceFrom ) => handleFromToPrice(priceTo , priceFrom )}
      />
      
      <div className={s.category_container}>
        {filteredList.length > 0 &&
          filteredList.map((elem) => (
            <ProductItem
              data={elem}
              key={elem.id + elem.title}
              products={list}
            />
          ))}
        {filteredList.length === 0 && <div>Sorry no products</div>}
      </div>
    </div>
  );
}
