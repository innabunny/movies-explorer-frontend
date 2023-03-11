import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList ({ moviesData }) {
  return (
    <section className="movies">
      <div className="movies__list">
        {moviesData.map(movie => {
          return <MoviesCard movie={movie} key={movie._id} />
        })}
      </div>
      <button className="movies__btn-more">Ещё</button>
    </section>
  )
}

export default MoviesCardList;