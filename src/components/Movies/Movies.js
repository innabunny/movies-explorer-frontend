import './Movies.css';
import { useLocation } from "react-router-dom";

import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SavedMovies from "../Movies/SavedMovies/SavedMovies";

function Movies() {

  const location = useLocation();

  return location.pathname === '/saved-movies' ? (
    <>
      <SearchForm />
      <SavedMovies />
    </>
  ) : (
    <>
      <SearchForm />
      <MoviesCardList />
    </>
  )
}

export default Movies;