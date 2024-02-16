import React, { useEffect, useState } from "react";
import s from '../AllProducts/AllProducts.module.css'
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROOT_URL } from "../../..";
import { getRelatedProducts } from "../../../features/products/productsSlice";
import { addItemToCart } from "../../../features/user/userSlice";

export default function AllProducts({ data: {id, title, image, price, discont_price}}) {

//TODO 
/**
  *
  * remove props 
  * take from state
  * 
  * 
  * 
  **/


   const { list } = useSelector(({ products }) => products);

  //add in ProductCart
//   const dispatch = useDispatch()
//    const [quantity, setQuantity] = useState(1);
//    const { details, isLoading } = useSelector((state) => state.singleProduct);

// const addToCart = () => {
//   dispatch(addItemToCart({ ...details[0], quantity: quantity}));
// };

  

//products map 
// const { id } = useParams();
// const dispatch = useDispatch();
// const { details, isLoading } = useSelector((state) => state.singleProduct);
// console.log(details, 'details...')


// if (!details || !Array.isArray(details) || details.length === 0 || isLoading) {
//   return <div>Loading...</div>;
// }

  return (
    <Link to={`/products/${id}`} key={id} className={s.product}>
    <div className={s.category_wrapper} key={id}  >
     {/* {details.length > 0 && details.map(({ id, image, title, discont_price, price }) => (  */}
        <div key={id} className={s.image_container}>
          <div>
            <img
              className={s.category_img}
              src={ROOT_URL + image}
              alt={title}
            />
      <button 
        className={s.addToCartButton} 
      >
        Add to Cart
      </button>
              {discont_price !== null && (
                <span className={s.discount_label}>
                  {`-${((1 - discont_price / price) * 100).toFixed(0)}%`}
                </span>
              )} 
          </div>
        </div>
       {/* ))}  */}

{/* {details.map(({ title, discont_price, price }) => (  */}
      <div className={s.content_wrapper}  >
        <p className={s.category_title} title={title}>
          {title}
        </p>
        {discont_price !== null && (
          <div className={s.price}>
            <span className={s.discounted_price}>{`$${discont_price} `}</span>
            <span className={s.original_price}>{`$${price}`}</span>
          </div>
        )}
        {discont_price === null && (
          <div className={s.price}>
            <span className={s.normal_price}>{`$${price}`}</span>
          </div>
        )}
      </div>
  {/* ))}  */}

    </div>
    </Link>
  );
}



// return (
//   <>
//   <Link to={`/products/${id}`} key={id} className={s.product}>
//     <div className={s.category_wrapper} key={id}>
//       {Array.isArray(details) && details.length > 0 ? (
//         details.map(({ id, image, title, discont_price, price }) => ( 
//           <div key={id} className={s.item_container}>
//             <div className={s.image_container}>
//               <img
//                 className={s.category_img}
//                 src={ROOT_URL + image}
//                 alt={title}
//               />
//               <button className={s.addToCartButton}>
//                 Add to Cart
//               </button>
//               {discont_price !== null && (
//                 <span className={s.discount_label}>
//                   {`-${((1 - discont_price / price) * 100).toFixed(0)}%`}
//                 </span>
//               )}
//             </div>
//             <div className={s.content_wrapper}>
//               <p className={s.category_title} title={title}>
//                 {title}
//               </p>
//               {discont_price !== null ? (
//                 <div className={s.price}>
//                   <span className={s.discounted_price}>{`$${discont_price} `}</span>
//                   <span className={s.original_price}>{`$${price}`}</span>
//                 </div>
//               ) : (
//                 <div className={s.price}>
//                   <span className={s.normal_price}>{`$${price}`}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))
//       ) : null}
//     </div>
//   </Link>
//   </>
// );
// }