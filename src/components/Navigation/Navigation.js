import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import './Navigation.css';
import icon from '../../images/account.svg';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

function Navigation() {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  const openHamburgerMenu = () => {
    setIsHamburgerMenuOpen(true);
  }

  const closeHamburgerMenu = () => {
    setIsHamburgerMenuOpen(false);
  }

  return (
    <section className="navigation">
      <nav className="navigation__links">
        <div className="navigation__links-movies">
          <NavLink className="navigation__link" to='/movies'>Фильмы</NavLink>
          <NavLink className="navigation__link" to='/saved-movies'>Сохранённые фильмы</NavLink>
        </div>
        <div className="navigation__links-profile">
          <NavLink className="navigation__link" to='/profile'>Аккаунт</NavLink>
          <Link to="/profile" className="navigation__link-icon">
            <div className="navigation__icon-container">
              <img src={icon} alt="аккаунт" className="navigation__icon"/>
            </div>
          </Link>
        </div>

      </nav>
      <nav className="navigation__hamburger-menu">
        <div className={`${isHamburgerMenuOpen ? "navigation__overlay" : ""}`}>
          <HamburgerMenu isOpen={isHamburgerMenuOpen}
                         onClick={openHamburgerMenu}
                         onClose={closeHamburgerMenu} />
        </div>

      </nav>
    </section>
  )
}

export default Navigation;