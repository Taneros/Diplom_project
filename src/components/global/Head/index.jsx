import React from 'react'
import logo from '../../media/logo.png'
import cart from "../../media/icon.png"
import st from './Header.module.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalItemCount } from '../../../features/user/userSlice';


export default function Header() {
  const totalItem = useSelector(selectTotalItemCount)

  return (
  <header className={st.container__header} >
    <nav className={`${st.header_wrapper} container`}>
       <Link to='/'>
       <img className={st.header_logo} src={logo} alt="logo" />
       </Link>
        <div className={st.header_nav_menu}>
        <ul className={st.menu}>
            <li className={st.list__item}><Link to="/">Main Page</Link></li>
            <li className={st.list__item}> <Link to="/categories">Categories</Link></li>
            <li className={st.list__item}> <Link to='/products/all'>All products</Link></li>
            <li className={st.list__item}><Link to="/sales">All sales</Link></li>
        </ul>
        </div>
        <Link to="/cart">
        <img className={st.header_img_cart} src={cart} alt="cart" />
        <div className={st.item__count}>{totalItem}</div>
      </Link>

    </nav>
    </header>
  )
}
