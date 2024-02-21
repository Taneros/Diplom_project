import React, { useState } from "react";
import s from "./FilterPanel.module.css";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { filterByPriceRange, setMaxPrice, setMinPrice } from "../../../features/products/productsSlice";



export default function FilterPanel({ onCheckboxChange, onOptionChange,maxPrice, minPrice,handleMaxPriceChange, handleMinPriceChange}) {



    // const { list } = useSelector(({ products }) => products )
  const [selectedOption, setSelectedOption] = useState('by default');

  //filter from ..to
  const handleEnterKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

// console.log("isSelected", isSelected)

  return (
    <div className="container">
      <div className={s.filter_wrapper}>
        <div className={s.price_filter}>
          <span>Price</span>
          <form className={s.filter__form} >
          <input 
              placeholder="from" 
              type="number"  
              value={minPrice}
              onChange={ handleMinPriceChange}
              onKeyDown={handleEnterKeyDown}
            />
          <input 
              placeholder="to" 
              type="number" 
              value={maxPrice}
              onChange={ handleMaxPriceChange }
              onKeyDown={handleEnterKeyDown}
             />
             </form>
        </div>
        <div className={s.checkbox}>
          <span>Discounted items</span>
           <label className={`${s.checkbox} ${s.style_c}`} >
            <input type="checkbox"  onClick={onCheckboxChange}/>
            <div className={s.checkbox__checkmark} ></div>
          </label>
        </div>
        <div className={s.sorter}>
          
          <span>Sorted</span>
          <select className={s.select_sorter} onChange={(e) => onOptionChange(e.target.value)}>
            <option>by default</option>
            <option>newest</option>
            <option>price: high-low</option>
            <option>price: low-high</option>
          </select>
          <BsChevronDown className={s.sorter__check}/>
        </div>
      </div>
    </div>
  );
}
