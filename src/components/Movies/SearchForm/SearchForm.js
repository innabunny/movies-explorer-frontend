import './SearchForm.css';
import CheckBox from '../CheckBox/CheckBox';

function SearchForm() {
  return (
    <section className="search-form">
      <form
        className="search-form__form"
        name="search-form"
      >
        <input className="search-form__input"
          type="text"
          name="request"
          placeholder="Фильм"
          // value=""
          // onChange={}
          required
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