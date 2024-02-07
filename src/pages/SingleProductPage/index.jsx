import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getSingleProduct,
  useGetProductsQuery,
} from "../../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { ROOT_URL } from "../..";
import s from "./SingleProductPage.module.css";
import AllProductsBtn from "../../components/UI/AllProductsBtn";

// import {  useGetProductsQuery } from '../../features/api/apiSlice';

export default function SingleProductPage() {

    // Состояние для хранения информации о том,  была ли кнопка нажата
    const [isClicked, setIsClicked] = useState(false); 
    const handleClick = () => {
      setIsClicked(true); // 
      setTimeout(() => setIsClicked(false), 600); // Через 600 мс возвращаем isClicked в false
    };

  const { id } = useParams();
  const dispatch = useDispatch();

  const { details, isLoading } = useSelector((state) => state.singleProduct);
  console.log("details  ....", details);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* <Link to={`/products/${id}`}> */}
      {/* <div key={details[0].id}>
          <h2>{details[0].title}</h2>
          <p>{details[0].description}</p>
          <p>{details[0].price}</p>
          <img src={ROOT_URL+ details[0].image}/>
        </div> */}
      {Array.isArray(details) && details.length > 0 ? (
        <div key={details[0].id} className="container">
          {details.map(({ id, title, description, price, image }) => (
            <div key={id} className={s.wrapper}>
              <div>
                <img src={ROOT_URL + image} alt={title} className={s.image} />
              </div>
              <section >
                <div className={s.price__container}>
                  <h2 className={s.title}>{title}</h2>
                  <p className={s.price}>${price}</p>
                  <div className={s.counter__container}>
                    <div className={s.count__wrapper}>
                    <button className={s.count_btn}>-</button>
                    <div className={s.count}>4</div>
                    <button className={s.count_btn}>+</button>
                    </div>
                    <button className={`${s.button} ${isClicked ? s.click : ''}`} onClick={handleClick}>
      Add to cart
    </button>
                  </div>
                  <div className={s.description__wrapper}>
                  <h3>Description</h3>
                  <p className={s.description}>{description}</p>
                  <p>Read more</p>
                </div>
                </div>
               
              </section>
            </div>
          ))}
        </div>
      ) : (
        <p>No product details available</p>
      )}
      <Link to="/products/all">
        <button>Go Back</button>
      </Link>
      {/* </Link> */}
    </>
  );
}
