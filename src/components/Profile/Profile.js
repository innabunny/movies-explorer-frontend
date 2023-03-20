import './Profile.css';
import React, {useState} from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useForm } from "react-hook-form";

function Profile({ handleUpdateDataUser,  handleLogout, errMessageProfile}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [check, setCheck] = useState(false);

  let { register, handleSubmit, watch, formState: { errors, isValid }} =
    useForm({mode: "onBlur", defaultValues:
      {profileName: currentUser.name, profileEmail: currentUser.email}})

  const [profileName, profileEmail] = watch(["profileName", "profileEmail"]);

  function onSubmit() {
    handleUpdateDataUser(profileName, profileEmail);
    setCheck(false);
  }

  return(
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}</h2>
      <form className="profile__form"
            name="profile-form"
            onSubmit={handleSubmit(onSubmit)}
      >
        <label className="profile__form-field">
          <p className="profile__text">Имя</p>
          <input
            {...register("profileName", {required: true,
            minLength: { value: 2, message: "Имя должно содержать минимум 2 символа"},
            maxLength: { value: 30, message: "Имя должно быть короче 30 сиволов"},
            disabled: !check
            })}
            className="profile__input" type="text"
          />
        </label>
        <span className="profile__err">{errors?.profileName?.message}</span>
        <label className="profile__form-field">
          <p className="profile__text">E-mail</p>
          <input
            {...register("profileEmail", {required: true,
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Введите корректный email",},
              disabled: !check
            })}
            className="profile__input" type="email"
          />
        </label>
        <span className="profile__err">{errors?.profileEmail?.message}</span>
        <span className="profile__err">{errMessageProfile}</span>

        <button className={`profile__button ${check && "profile__button_disabled"}`} type="button"
                onClick={() => setCheck(true)} >Редактировать</button>
        <button className={`profile__button-submit ${check && "profile__button-submit_visible"} 
          ${isValid && (profileName !== currentUser.name && profileEmail !== currentUser.email) && "profile__button-submit_enabled"}`}
                type="submit" >Сохранить</button>
        <Link className="profile__link-out" to="/" onClick={handleLogout}>
          Выйти из аккаунта
        </Link>
      </form>
    </section>
  )
}

export default Profile;