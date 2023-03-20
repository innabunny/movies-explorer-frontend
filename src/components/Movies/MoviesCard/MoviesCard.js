import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';
import { MOVIE_URL } from "../../../utils/constants";

function MoviesCard({ movie, handleSavedMovie, handleDeleteMovie, savedMovies }) {
  const location = useLocation();
  const time = Math.trunc(movie.duration/60) + "ч" + " " + movie.duration % 60 + "м.";
  const [isSaved, setIsSaved] = useState(false);

  function saveMovie() {
    handleSavedMovie({
      country: String(movie.country),
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${MOVIE_URL}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `${MOVIE_URL}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    });
    setIsSaved(!isSaved);
  }

  function deleteMovie() {
    handleDeleteMovie(movie);
    setIsSaved(!isSaved);
  }

  function handleLikeClick() {
    if (!isSaved) {
      saveMovie();
    } else {
      deleteMovie(movie);
    }
  }

  useEffect(() => {
    if (location.pathname === "/movies") {
      savedMovies.find((item) => item.movieId === (movie.id || movie.movieId) && setIsSaved(true));
    }

  }, [savedMovies])

  return (
    <div className="movie-card">
      <a className="movie-card__link" href={movie.trailerLink} target={"_blank"} rel="noreferrer">
        <img className="movie-card__img" src={movie.image.url ? `${MOVIE_URL}/${movie.image.url}` : movie.image} alt={movie.nameRU} />
      </a>
        <div className="movie-card__description">
          <h2 className="movie-card__name">{movie.nameRU}</h2>

          { location.pathname === "/movies" && (
            <button type="button" className={`movies-card__btn ${isSaved && "movies-card__btn-like"}`}
            onClick={handleLikeClick}></button>)}

           { location.pathname === "/saved-movies" && (
            <button type="button" className="movies-card__btn movies-card__btn-unsaved" onClick={deleteMovie}></button>)}

        </div>
        <p className="movies-card__duration">{time}</p>
    </div>
  )
}

export default MoviesCard;