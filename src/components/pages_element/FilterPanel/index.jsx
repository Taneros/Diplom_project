import React, { useState } from "react";
import s from "./FilterPanel.module.css";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";



export default function FilterPanel() {

  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);
  // // };


    const { list } = useSelector(({ products }) => products )
  const [selectedOption, setSelectedOption] = useState('by default');

 const handleSelectChange = (e) => {
  setSelectedOption(e.target.value);
   }

 
  const [isSelected, setIsSelected ] = useState('false')

 const isCheckboxSelected = () => {
  setIsSelected(!isSelected )
} 

console.log("isSelected", isSelected)

  return (
    <div className="container">
      <div className={s.filter_wrapper}>
        <div className={s.price_filter}>
          <span>Price</span>
          <input placeholder="from" type="text" />
          <input placeholder="to" type="text" />
        </div>
        <div className={s.checkbox}>
          <span>Discounted items</span>
           <label className={`${s.checkbox} ${s.style_c}`} >
            <input type="checkbox"  onClick={isCheckboxSelected}/>
            <div className={s.checkbox__checkmark} ></div>
          </label>
        </div>
        <div className={s.sorter}>
          
          <span>Sorted</span>
          <select className={s.select_sorter} >
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
