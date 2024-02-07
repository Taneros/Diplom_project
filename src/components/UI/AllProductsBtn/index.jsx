import React from "react";
import s from "./AllProductsBtn.module.css";

export default function AllProductsBtn({ buttonText }) {
  return (
    <div className={s.container}>
      <button className={s.allProducts_btn}> {buttonText}</button>
    </div>
  );
}
