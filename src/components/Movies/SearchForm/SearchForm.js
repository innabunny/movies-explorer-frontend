import './SearchForm.css';
import CheckBox from '../CheckBox/CheckBox';
import { useForm } from "react-hook-form";

function SearchForm({ findMovies }) {
  const pageMovie = window.location.pathname === '/movies';

  const { register, handleSubmit, watch, } = useForm({mode: "onBlur",});
    // defaultValues: {inputSearch: pageMovie ? localStorage.getItem("inputSearchMovie") :
    //     localStorage.getItem("inputSearchSavedMovie")}});

  const inputSearch = watch(pageMovie ? "inputSearchMovie" : "inputSearchSavedMovie");


  function onSubmit() {
    findMovies(inputSearch);
    pageMovie ?  localStorage.setItem("inputSearchMovie", inputSearch) :
      localStorage.setItem("inputSearchSavedMovie", inputSearch);
  }

  return (
    <section className="search-form">
      <form onSubmit={handleSubmit(onSubmit)}
        className="search-form__form"
        name="search-form"
      >
        <input
          {...register(pageMovie ? "inputSearchMovie" : "inputSearchSavedMovie",
            {required: {value: true, message: "Введите ключевое слово"}, value: pageMovie ? localStorage.getItem("inputSearchMovie")
                : localStorage.getItem("inputSearchSavedMovie"), minLength: 1})}
          className="search-form__input"
          type="text"
          placeholder="Фильм"
        />
        <button className="search__btn"
                type="submit"
        >
        </button>
      </form>
      <CheckBox />
    </section>
  )
}

export default SearchForm;