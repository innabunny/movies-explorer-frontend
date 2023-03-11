import { Link } from "react-router-dom";
import './Register.css';

function Register() {
  return (
    <section className="register">
      <Link to={'/'} className="register__logo"></Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form"
            name="register-form"
      >
        <p className="register__text">Имя</p>
            <input className="register__input"
                   type="text"
                   name="name"
                   minLength="2"
                   value=""
                   // onChange={}
                   required />
            <span className="register__err"></span>
        <p className="register__text">E-mail</p>
            <input className="register__input"
                   type="email"
                   name="email"
                   value=""
                   pattern="^\S+@\S+\.\S+$"
                   // onChange={}
                   required />
        <span className="register__err"></span>
        <p className="register__text">Пароль</p>
            <input className="register__input"
                   type="password"
                   name="password"
                   value=""
                   minLength="4"
                   // onChange={}
                   required />
        <span className="register__err">Что-то пошло не так</span>
         <button className="register__button">Зарегистрироваться</button>
          <Link className="register__link" to="/signin">
            Уже зарегистрированы?
            <span className="register__login">Войти</span>
          </Link>
      </form>
    </section>
  )
}

export default Register;