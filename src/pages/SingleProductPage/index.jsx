import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getSingleProduct,
  useGetProductsQuery,
} from "../../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { ROOT_URL } from "../..";
// import {  useGetProductsQuery } from '../../features/api/apiSlice';

export default function SingleProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();


  const { details, isLoading } = useSelector((state) => state.singleProduct);
console.log('details  ....', details);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

if(isLoading){
  return <p>Loading...</p>
}
 

  return (
    <>
      {/* <Link to={`/products/${id}`}> */}
        SingleProductPage
     
        {/* <div key={details[0].id}>
          <h2>{details[0].title}</h2>
          <p>{details[0].description}</p>
          <p>{details[0].price}</p>
          <img src={ROOT_URL+ details[0].image}/>
        </div> */}
       {Array.isArray(details) && details.length > 0 ? (
      <div key={details[0].id}>
        {details.map(({ id, title, description, price, image }) => (
          <div key={id}>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{price}</p>
            <img src={ROOT_URL + image} alt={title} />
          </div>
        ))}
      </div>
    ) : (
      <p>No product details available</p>
    )}
        <Link to='/products/all'>
          <button >Go Back</button>
        </Link>
      {/* </Link> */}
    </>
  );


}
