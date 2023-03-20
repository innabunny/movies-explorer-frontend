import { MOVIE_URL } from './constants';

class MoviesApi {
  constructor({ movieURL }) {
    this._movieURL = movieURL;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getMovies() {
    return fetch(`${this._movieURL}/beatfilm-movies`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(this._checkServerResponse)
  }
}

const moviesApi = new MoviesApi({
  movieURL: `${MOVIE_URL}`,
});

export default moviesApi;