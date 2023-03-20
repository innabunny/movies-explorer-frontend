import React, {useEffect, useState} from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {useLocation} from "react-router-dom";

function MoviesCardList ({ movies, handleSavedMovie, savedMovies, handleDeleteMovie }) {
  const location = useLocation();
  const innerWidth = window.innerWidth;
  const [counter, setCounter] = useState(12);

  useEffect(() => {
    if (innerWidth < 1200) {
      setCounter(8);
      return
    }
    if (innerWidth < 500) {
      setCounter(5);
    }
  }, [innerWidth])

  function loadMoreMovies() {
    if (innerWidth > 1200) {
      setCounter(counter + 3);
      return;
    }
    if (innerWidth < 1200) {
      setCounter(counter + 2);
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