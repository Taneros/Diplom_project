import React, { useEffect, useRef } from "react";

import Featured from "../../components/pages_element/Featured";
import Categories from "../../components/pages_element/Categories";
import DiscountForm from "../../components/pages_element/DiscountForm";
import SaleModule from "../../components/pages_element/SaleModule";
import { useDispatch, useSelector } from "react-redux";
import { filterByPrice } from "../../features/products/productsSlice";

export default function MainPage() {
  
  const dispatch = useDispatch()
  const {products: { list, filtered }, categories } = useSelector((state) => state)
  useEffect(() => {
    if(!list.length) return
    dispatch(filterByPrice(100));
  }, [dispatch, list.length]);

  const saleRef = useRef(null);

  const handleClick = () => {
    if (saleRef.current) {
      saleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <div>

      <Featured onClick={handleClick} />
      <Categories showQuantityCategories={4} />
      <DiscountForm />
      {/* <div ref={saleRef}>
        <SaleModule showQuantitySaleItems={4} />
      </div> */}
      <div ref={saleRef}>
        <SaleModule showQuantitySaleItems={4} products={filtered} amount={4} />
      </div>
    </div>
  );
}
