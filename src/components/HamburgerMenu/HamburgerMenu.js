import './HamburgerMenu.css';
import icon from "../../images/account.svg";
import { Link, NavLink } from "react-router-dom";

function HamburgerMenu({ isOpen, onClick, onClose }) {
  const hamburgerBtn = `hamburger-menu__visible ${isOpen ? 'hamburger-menu__hidden' : 'hamburger-menu__visible'}`;
  const hamburgerActive = `hamburger-menu ${isOpen ? 'hamburger-menu__active' : ' '}`;
  return (
    <>
      <button className={hamburgerBtn}
              onClick={onClick}
      />
      <div className={hamburgerActive}>
        <button className="hamburger-menu__close" onClick={onClose} />
        <nav className="hamburger-menu__links">
          <NavLink className={({ isActive }) =>
            isActive ? "hamburger-menu__link_active" : "hamburger-menu__link"
          } to="/">Главная</NavLink>

          <NavLink className={({ isActive }) =>
            isActive ? "hamburger-menu__link_active" : "hamburger-menu__link"
          } to="/movies">Фильмы</NavLink>

          <NavLink className={({ isActive }) =>
            isActive ? "hamburger-menu__link_active" : "hamburger-menu__link"
          } to="/saved-movies">Сохранённые фильмы</NavLink>
        </nav>
        <nav className='hamburger-menu__footer'>
          <NavLink className={({ isActive }) =>
            isActive ? "hamburger-menu__account-active" : "hamburger-menu__account"
          } to="/profile">Аккаунт</NavLink>
          <Link to="/profile" className="navigation__link-icon">
            <div className="navigation__icon-container">
              <img src={icon} alt="аккаунт" className="navigation__icon"/>
            </div>
          </Link>
        </nav>
      </div>
    </>
  )
}

export default HamburgerMenu;