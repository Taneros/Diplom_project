import React, { useEffect } from "react";
import image_404 from "./../../components/media/404.png";
import s from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";

export default function NotFoundPage() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className={s.container_page}>
      <div className={s.wrapper_notFounfPage}>
        <img
          className={s.img_notFound_page}
          src={image_404}
          alt="not-found-page"
        />

        <div className={s.content}>
          <h2 className={s.title}>Page Not Found</h2>
          <p className={s.text}>
            We’re sorry, the page you requested could not be found.
            <br /> Please go back to the homepage.
          </p>
        </div>
        <Link to="/">
          <button className={s.btn_notfoundPage}>Go Home</button>
        </Link>
      </div>
    </div>
  );
}
