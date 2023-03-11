import React from "react";
import './MoviesCardList.css';
import movies from '../../../utils/moviesData.js';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList () {
  return (
    <section className="movies">
      <div className="movies__list">
        {movies.map(movie => {
          return <MoviesCard movie={movie} key={movie._id} />
        })}
      </div>
      <button className="movies__btn-more">Ещё</button>
    </section>



  )
}

export default MoviesCardList;