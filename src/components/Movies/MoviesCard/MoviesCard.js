import React from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';


function MoviesCard({ movie }) {
  const location = useLocation();

  return (
    <div className="movie-card">
        <img className="movie-card__img" src={movie.img} alt={movie.title} />
        <div className="movie-card__description">
          <h2 className="movie-card__name">{movie.title}</h2>

          { location.pathname === "/movies" && (
            <button type="button" className={`movies-card__btn ${movie.like && "movies-card__btn-like"}`}></button>)}

           { location.pathname === "/saved-movies" && (
            <button type="button" className="movies-card__btn movies-card__btn-unsaved"></button>)}

        </div>
        <p className="movies-card__duration">{movie.duration}</p>
    </div>
  )
}

export default MoviesCard;