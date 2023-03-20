import './Movies.css';

import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Preloader from "../Movies/Preloader/Preloader";

function Movies({ movies, errorMessage, onSearch, loading,
                  handleSavedMovie, savedMovies, handleDeleteMovie, checkbox }) {

  return (
    <>
      <SearchForm findMovies={onSearch} checkbox={checkbox} />
      {loading ?
        <div className="movies__preloader">
          <Preloader />
        </div>
      : movies.length > 0 ?
        <MoviesCardList
          movies={movies}
          handleSavedMovie={handleSavedMovie}
          savedMovies={savedMovies}
          handleDeleteMovie={handleDeleteMovie}
        /> : <p>{errorMessage ? errorMessage : "Ничего не найдено"}</p>
      }
    </>
  )
}

export default Movies;