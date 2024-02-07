import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getSingleProduct,
  useGetProductsQuery,
} from "../../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { ROOT_URL } from "../..";
import s from "./SingleProductPage.module.css";


// import {  useGetProductsQuery } from '../../features/api/apiSlice';

export default function SingleProductPage() {
  // Состояние для хранения информации о том,  была ли кнопка нажата
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true); //
    setTimeout(() => setIsClicked(false), 600); // Через 600 мс возвращаем isClicked в false
  };

  //Для скрытия текста
  const [showFullDescription, setShowFullDescription] = useState(false);

  const maxCharacters = 200; // Максимальное количество символов в коротком описании
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const { id } = useParams();
  const dispatch = useDispatch();

  const { details, isLoading } = useSelector((state) => state.singleProduct);
  // console.log("details  ....", details);

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
          {details.map(
            ({ id, title, description, price, image, discont_price }) => (
              <div key={id} className={s.wrapper}>
                <div>
                  <img src={ROOT_URL + image} alt={title} className={s.image} />
                </div>
                <section>
                  <div className={s.price__container}>
                    <h2 className={s.title}>{title}</h2>
                    <div className={s.price}>
                      {discont_price !== null ? (
                        <div className={s.discount__wrapper}>
                          <span
                            className={s.discounted_price}
                          >{`$${discont_price}`}</span>
                          <span
                            className={s.original_price}
                          >{`$${price}`}</span>
                          <span className={s.discount_percent}>
                            {`-${((1 - discont_price / price) * 100).toFixed(
                              0
                            )}%`}
                          </span>
                        </div>
                      ) : (
                        <span className={s.normal_price}>{`$${price}`}</span>
                      )}
                    </div>
                    <div className={s.counter__container}>
                      <div className={s.count__wrapper}>
                        <button className={s.count_btn}>-</button>
                        <div className={s.count}>4</div>
                        <button className={s.count_btn}>+</button>
                      </div>
                      <button
                        className={`${s.button} ${isClicked ? s.click : ""}`}
                        onClick={handleClick}
                      >
                        Add to cart
                      </button>
                    </div>

                    <div className={s.description__wrapper}>
                      <p>
                        {showFullDescription
                          ? description
                          : description.length > maxCharacters
                          ? description.slice(0, maxCharacters) + "..."
                          : description}
                      </p>
                      {description.length > maxCharacters && (
                        <button
                          className={s.description__btn}
                          onClick={toggleDescription}
                        >
                          {showFullDescription ? "Read less" : "Read more"}
                        </button>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            )
          )}
        </div>
      ) : null}

      {/* </Link> */}
    </>
  );
}
