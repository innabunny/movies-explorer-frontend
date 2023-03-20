import { Link } from "react-router-dom";
import './Register.css';
import { useForm } from "react-hook-form";

function Register({ handleRegister, errorMessageReg }) {
  const { register, handleSubmit, watch, formState: { errors, isValid, isDirty } } = useForm({ mode: "onBlur" });

  const [regName, regEmail, regPassword] = watch(["regName", "regEmail", "regPassword"]);

  function onSubmit() {
    handleRegister(regName, regEmail, regPassword);
  }

  return (
    <section className="register">
      <Link to={'/'} className="register__logo"></Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form"
            name="register-form"
            onSubmit={handleSubmit(onSubmit)}
      >
        <p className="register__text">Имя</p>
            <input
              {...register("regName",
                {required: true,
                  minLength: {
                    value: 2,
                    message: "Введите больше 2 символов",
                  },
                  maxLength: {
                    value: 30,
                    message: "Имя должно быть  меньше 30 символов",
                  }})}
              className="register__input"
              type="text"
                   // name="name"
                   // minLength="2"
                   // value=""
                   // // onChange={}
                   // required
            />
            <span className="register__err">{errors?.regName?.message}</span>
        <p className="register__text">E-mail</p>
            <input
              {...register("regEmail", {required: true,
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Введите корректный email"} })}
              className="register__input"
              type="email"
                   // name="email"
                   // value=""
                   // pattern="^\S+@\S+\.\S+$"
                   // // onChange={}
                   // required
            />
        <span className="register__err">{errors?.regEmail?.message}</span>
        <p className="register__text">Пароль</p>
            <input {...register("regPassword", {required: true,
              minLength: {value: 4, message: "Пароль должен быть больше 4 символов"}})}
              className="register__input"
              type="password"
                   // name="password"
                   // value=""
                   // minLength="4"
                   // onChange={}
                   required />
        <span className="register__err">{errors?.regPassword?.message}</span>
        <span className="register__err">{errorMessageReg}</span>
         <button className={`register__button ${!isValid && "register__button_disabled"}`} type="submit" disabled={!isValid || !isDirty}>Зарегистрироваться</button>
          <Link className="register__link" to="/signin">
            Уже зарегистрированы?
            <span className="register__login">Войти</span>
          </Link>
      </form>
    </section>
  )
}

export default Register;