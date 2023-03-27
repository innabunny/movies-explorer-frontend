import './Profile.css';
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";

function Profile({ handleUpdateDataUser,  handleLogout, errMessageProfile}) {
  const [edit, setEdit] = useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  let { register, handleSubmit, watch, formState: { errors, isValid, isDirty}, reset} =
    useForm({mode: "onBlur", defaultValues:
        {profileName: currentUser.name, profileEmail: currentUser.email}});

  const [profileName, profileEmail] = watch(["profileName", "profileEmail"]);

  function onSubmit() {
    handleUpdateDataUser(profileName, profileEmail);
    setEdit(false);
  }

  useEffect(() => {
    reset({profileName: currentUser.name, profileEmail: currentUser.email});
  }, [currentUser.name, currentUser.email])

  return(
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}</h2>
      <form className="profile__form"
            onSubmit={handleSubmit(onSubmit)}
      >
        <label className="profile__form-field">
          <p className="profile__text">Имя</p>
          <input
            {...register("profileName",  {required: true,
            minLength: { value: 2, message: "Имя должно содержать минимум 2 символа"},
            maxLength: { value: 30, message: "Имя должно быть короче 30 сиволов"},
            disabled: !edit,
            })
          }
            className="profile__input" type="text"
          />
        </label>
        <span className="profile__err">{errors?.profileName?.message}</span>
        <label className="profile__form-field">
          <p className="profile__text">E-mail</p>
          <input
            {...register("profileEmail", {required: true,
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Введите корректный email",},
              disabled: !edit,
            })}
            className="profile__input" type="email"
          />
        </label>
        <span className="profile__err">{errors?.profileEmail?.message}</span>
        <span className="profile__err">{errMessageProfile}</span>
        <button className={`profile__button ${edit && "profile__button_disabled"}`} type="button"
                onClick={() => {setEdit(true)}} >Редактировать</button>
        <button className={`profile__button-submit ${edit && "profile__button-submit_visible"}
         ${(isDirty && isValid) && "profile__button-submit_enabled"}`} type="submit">
          Сохранить</button>
        <Link className="profile__link-out" to="/" onClick={handleLogout}>
          Выйти из аккаунта
        </Link>
      </form>
    </section>
  )
}

export default Profile;