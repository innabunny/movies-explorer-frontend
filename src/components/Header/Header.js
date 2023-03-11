import './Header.css';
import {Link } from "react-router-dom";
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  return !loggedIn ? (
    <>
      <header className="header">
        <Link to="/" className="header__logo"></Link>
        <nav className="header__links">
          <Link className="header__register" to='/signup'>Регистрация</Link>
          <Link className="header__login" to='/signin'>Войти</Link>
        </nav>
      </header>
    </>
  ) : (
    <header className="header header-light">
      <Link to="/" className="header__logo"></Link>
      <Navigation />
    </header>
  )
}

export default Header;