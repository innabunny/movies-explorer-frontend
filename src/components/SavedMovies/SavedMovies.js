import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function SavedMovies({ moviesData }) {

  return(
    <>
      <SearchForm />
      <MoviesCardList moviesData={moviesData.filter(movie => movie.like === true)} />
    </>
  )
}

export default SavedMovies;