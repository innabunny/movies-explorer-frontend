import './Login.css';
import {Link} from "react-router-dom";
import { useForm } from "react-hook-form";

function Login({ handleLogin, errorMessageLog }) {
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({ mode: "onBlur" });

  const [logEmail, logPassword] = watch(["logEmail", "logPassword"]);

  function onSubmit() {
    handleLogin(logEmail, logPassword);
  }
  return (
    <section className="login">
      <Link to={'/'} className="login__logo"></Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form"
            onSubmit={handleSubmit(onSubmit)}
            // name="login-form"
      >
        <p className="login__text">E-mail</p>
        <input
          {...register("logEmail", {required: true,
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Введите корректный email"}})}
          className="login__input"
               type="email"
          //      name="email"
          //      value=""
          //      pattern="^\S+@\S+\.\S+$"
          // // onChange={}
          //      required
        />
        <span className="login__err">{errors?.logEmail?.message}</span>
        <p className="login__text">Пароль</p>
        <input
          {...register("logPassword",{required: true})}
          className="login__input"
               type="password"
               // name="password"
               // value=""
               // minLength="4"
          // onChange={}
          //      required
        />
        <span className="login__err">{errors?.logPassword && "Введите пароль"}</span>
        <span className="login__err">{errorMessageLog}</span>
        <button className={`login__button ${!isValid && "login__button_disabled"}`} disabled={!isValid} type="submit">Войти</button>
        <Link className="login__link" to="/signup">
          Ещё не зарегистрированы?
          <span className="login__register">Регистрация</span>
        </Link>
      </form>
    </section>
  )
}

export default Login;