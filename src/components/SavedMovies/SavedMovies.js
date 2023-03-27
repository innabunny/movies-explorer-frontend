import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Preloader from "../Movies/Preloader/Preloader";

function SavedMovies({ movies, handleDeleteMovies, onSearch, loading, renderedMovies }) {

  return(
    <>
      <SearchForm
        findMovies={onSearch}
      />
      {loading ?
        <div className="movies__preloader">
          <Preloader />
        </div>
        :
        (movies.length === 0 && renderedMovies.length === 0) ? "Ничего не найдено" : (
      <MoviesCardList
        movies={(renderedMovies.length > 0) ? renderedMovies : movies}
        key={movies.id}
        handleDeleteMovie={handleDeleteMovies}
      />
        )}
    </>
  )
}

export default SavedMovies;