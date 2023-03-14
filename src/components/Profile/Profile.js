import './Profile.css';
import {Link} from "react-router-dom";

function Profile() {
  return(
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form"
            name="profile-form"
      >
        <label className="profile__form-field">
          <p className="profile__text">Имя</p>
          <input className="profile__input"
                 type="text"
                 name="name"
                 value=""
                 minLength="2"
                 placeholder="Имя"
            // onChange={}
                 required />
        </label>
        <span className="profile__err"></span>
        <label className="profile__form-field">
          <p className="profile__text">E-mail</p>
          <input className="profile__input"
                 type="email"
                 name="email"
                 value=""
                 pattern="^\S+@\S+\.\S+$"
                 placeholder="E-mail"
            // onChange={}
                 required />
        </label>
        <span className="profile__err">При обновлении профиля произошла ошибка.</span>
        <button className="profile__button">Редактировать</button>
        <Link className="profile__link-out" to="/">
          Выйти из аккаунта
        </Link>
      </form>
    </section>
  )
}

export default Profile;