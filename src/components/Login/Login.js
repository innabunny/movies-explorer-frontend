import './Login.css';
import {Link} from "react-router-dom";

function Login() {
  return (
    <section className="login">
      <Link to={'/'} className="login__logo"></Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form"
            name="login-form"
      >
        <p className="login__text">E-mail</p>
        <input className="login__input"
               type="email"
               name="email"
               value=""
               pattern="^\S+@\S+\.\S+$"
          // onChange={}
               required />
        <span className="login__err"></span>
        <p className="login__text">Пароль</p>
        <input className="login__input"
               type="password"
               name="password"
               value=""
               minLength="4"
          // onChange={}
               required />
        <span className="login__err">Что-то пошло не так</span>
        <button className="login__button">Войти</button>
        <Link className="login__link" to="/signup">
          Ещё не зарегистрированы?
          <span className="login__register">Регистрация</span>
        </Link>
      </form>
    </section>
  )
}

export default Login;