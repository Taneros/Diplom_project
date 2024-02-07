import React from 'react'
import logo from '../../media/logo.png'
import cart from "../../media/icon.png"
import st from './Header.module.css'
import { Link } from 'react-router-dom';


export default function Header() {
  return (
  <header className={st.container__header} >
    <nav className={`${st.header_wrapper} container`}>
       <Link to='/'>
       <img className={st.header_logo} src={logo} alt="logo" />
       </Link>
        <div className={st.header_nav_menu}>
        <ul>
            <li><Link to="/">Main Page</Link></li>
            <li> <Link to="/categories">Categories</Link></li>
            <li> <Link to='/products/all'>All products</Link></li>
            <li><Link to="/sales">All sales</Link></li>
        </ul>
        </div>
        <Link to="/cart">
        <img className={st.header_img_cart} src={cart} alt="cart" />
      </Link>

    </nav>
    </header>
  )
}
