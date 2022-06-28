import React, { useContext } from 'react';
import { Context } from '../Context';
import styles from './Header.module.scss'

import { Link } from 'react-router-dom'



const Header = ({ onCartClick }) => {    

  const { totalPrice } = useContext(Context)

    return ( 
      <>
        <header className={styles.header}>
          <div className={styles.logo}>
            <Link to="/">
              saynshop.
            </Link>
          </div>
          <div className={styles.info}>
            <div onClick={onCartClick} className={styles.cart}>
              <img src="img/cart.svg" alt="Карты" />
              {totalPrice} руб.
            </div>
            <div className={styles.favorite}>
              <Link to="/favorites">
                <img src="img/favorite.svg" alt="Фавориты" />
              </Link>
            </div>
            <div className={styles.profile}>
              <Link to="/profile">
                <img src="img/profile.svg" alt="Профиль" />
              </Link>
            </div>
          </div>
        </header>
      </>
    );
}

export default Header;
