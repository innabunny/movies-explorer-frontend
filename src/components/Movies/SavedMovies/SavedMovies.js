import './SavedMovies.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import movies from '../../../utils/moviesData.js';


function SavedMovies() {
  return(
    <section className="movies">
      <div className="movies__list">
        {movies.filter(movieItem => movieItem.like === true).map(movie => {
          return <MoviesCard movie={movie} key={movie._id}  />
        })
        }
      </div>
    </section>
  )
}

export default SavedMovies;