import { MAIN_URL} from "./constants.js";

class MainApi {
  constructor({ mainURL }) {
    this._mainURL = mainURL;
  }
  get _headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
    }
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  register = (name, email, password) => {
    return fetch(`${this._mainURL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
      .then(this._checkServerResponse)
  }

  authorisation  = ( email, password ) => {
    return fetch(`${this._mainURL}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
      .then(this._checkServerResponse)
  }

  getUserInfo = () => {
    return fetch(`${this._mainURL}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkServerResponse)
  }

  editProfile({ name, email }) {
    return fetch(`${this._mainURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, email })
    })
      .then(this._checkServerResponse)
  }

  saveMovie(data) {
    return fetch(`${this._mainURL}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkServerResponse)
  }

  getSavedMovies() {
    return fetch(`${this._mainURL}/movies`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkServerResponse)
  }

  deleteMovie(id) {
    return fetch(`${this._mainURL}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkServerResponse)
  }
}

const mainApi = new MainApi({
  mainURL: `${MAIN_URL}`,
});

export default mainApi;