import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  INITIAL_MOVIES_DESKTOP, SCREEN_SIZE_DESKTOP, LOAD_MORE_DESKTOP, SCREEN_SIZE_MOBILE, COUNTER_MOVIES_MOBILE,
  LOAD_MORE_MOVIES_MOBILE, COUNTER_MOVIES_DESKTOP
} from '../../../utils/constants';

function MoviesCardList ({ movies, handleSavedMovie, savedMovies, handleDeleteMovie }) {
  const location = useLocation();
  const innerWidth = window.innerWidth;
  const [counter, setCounter] = useState(INITIAL_MOVIES_DESKTOP);

  useEffect(() => {
    if (innerWidth < SCREEN_SIZE_DESKTOP) {
      setCounter(COUNTER_MOVIES_DESKTOP);
      return
    }
    if (innerWidth < SCREEN_SIZE_MOBILE) {
      setCounter(COUNTER_MOVIES_MOBILE);
    }
  }, [innerWidth])

  function loadMoreMovies() {
    if (innerWidth > SCREEN_SIZE_DESKTOP) {
      setCounter(counter + LOAD_MORE_DESKTOP);
      return;
    }
    if (innerWidth < SCREEN_SIZE_DESKTOP) {
      setCounter(counter + LOAD_MORE_MOVIES_MOBILE);
    }
  }

  return (
    <section className="movies">
      <div className="movies__list">
        {movies.slice(0, counter).map(movie => {
          return <MoviesCard
            handleSavedMovie={handleSavedMovie}
            movie={movie}
            key={movie.id}
            savedMovies={savedMovies}
            handleDeleteMovie={handleDeleteMovie}
          />
        })}
      </div>
      { location.pathname === "/movies" && (
        movies.length > counter &&
      <button className="movies__btn-more" onClick={loadMoreMovies}>Ещё</button> )}
    </section>
  )
}

export default MoviesCardList;