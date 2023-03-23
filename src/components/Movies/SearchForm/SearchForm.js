import './SearchForm.css';
import CheckBox from '../CheckBox/CheckBox';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";

function SearchForm({ findMovies }) {
  const location = useLocation();
  const pageMovie = location.pathname === '/movies';
  const [checkboxStatus, setCheckboxStatus] = useState(false);

  const { register, handleSubmit, watch, } = useForm({mode: "onBlur",});

  const inputSearch = watch(pageMovie ? "inputSearchMovie" : "inputSearchSavedMovie");

  function handleChangeCheckbox(evt) {
      setCheckboxStatus(evt.target.checked);
  }

  function onSubmit() {
    pageMovie && localStorage.setItem("inputSearchMovie", inputSearch);
    findMovies(inputSearch, checkboxStatus);
  }

  useEffect(() => {
    if (pageMovie) {
      const checkbox = JSON.parse(localStorage.getItem("checkboxStatus"));
      if (checkbox) {
        setCheckboxStatus(true);
      } else  {
        setCheckboxStatus(false);
      }
    }
  }, [location.pathname]);

  return (
    <section className="search-form">
      <form onSubmit={handleSubmit(onSubmit)}
        className="search-form__form"
        name="search-form"
      >
        <input
          {...register(pageMovie ? "inputSearchMovie" : "inputSearchSavedMovie",
            {required: {value: true, message: "Введите ключевое слово"}, value: pageMovie ?
                localStorage.getItem("inputSearchMovie") : localStorage.getItem("inputSearchSavedMovie"),
                minLength: 1})}
          className="search-form__input"
          type="text"
          placeholder="Фильм"
        />
        <button className="search__btn"
                type="submit"
        >
        </button>
      </form>
      <CheckBox
        checkboxStatus={checkboxStatus}
        handleChangeCheckbox={handleChangeCheckbox} />
    </section>
  )
}

export default SearchForm;