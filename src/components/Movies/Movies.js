import './Movies.css';

import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function Movies({ moviesData }) {

  return (
    <>
      <SearchForm />
      <MoviesCardList moviesData={moviesData} />
    </>
  )
}

export default Movies;