import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate,} from "react-router-dom";
import { CurrentUserContext } from '../../context/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageReg, setErrorMessageReg] = useState("");
  const [errorMessageLog, setErrorMessageLog] = useState("");
  const [errorMessageProfile, setErrorMessageProfile] = useState("");

  const [loading, setLoading] = useState(false);

  const [apiMovies, setApiMovies] = useState([]);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [renderedSavedMovies, setRenderedSavedMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [shortSavedMovies, setShortSavedMovies] = useState([]);

  const [savedMovies, setSavedMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn])

  function startPreloader() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }

  function handleRegister(name, email, password) {
    mainApi.register(name, email, password)
      .then((res) => {
        setCurrentUser(res);
        handleLogin(email,password);
      })
      .catch((err) => {
        if (err.includes(409)) {
          setErrorMessageReg("Пользователь с таким email уже существует");
        }
        else {
          setErrorMessageReg("Внутренняя ошибка сервера");
          console.log(err);
        }
      });
  }

  function handleLogin(email, password) {
     mainApi.authorisation(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch((err) => {
        if (err.includes(401)) {
          setErrorMessageLog("Неправильные почта или пароль");
        }
        else {
          setErrorMessageLog("Внутренняя ошибка сервера");
        }

      });
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.clear();
    navigate('/');
  }

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .getUserInfo(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setCurrentUser(res)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  function handleUpdateUser(name, email) {
    // const token = localStorage.getItem('jwt');
    mainApi
      .editProfile({name, email})
      .then((updateUser) => {
        setLoggedIn(true);
        setCurrentUser(updateUser);
        localStorage.setItem('name', updateUser.name);
        localStorage.setItem('email', updateUser.email);
        setErrorMessageProfile('Профиль успешно обновлен!');
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setErrorMessageProfile('Пользователь с таким email уже существует');
        } else {
          setErrorMessageProfile('При обновлении профиля произошла ошибка');
        }
      })
      .finally(() => {
        setTimeout(() => setErrorMessageProfile(""), 1000);
      })
  }

  function findMovies(value) {
    startPreloader();
    setRenderedMovies([]);
    if (localStorage.getItem("checkbox")) {
        let searchMovie = shortMovies.filter((item) => item.nameRU.toLowerCase().includes(value.toLowerCase()) ? item : null);
        setRenderedMovies(searchMovie);
      } else {
        let searchMovie = apiMovies.filter((item) => item.nameRU.toLowerCase().includes(value.toLowerCase()) ? item : null);
        setRenderedMovies(searchMovie);
      }
    localStorage.setItem("lastFoundMovies", JSON.stringify(renderedMovies));
  }

  function findSavedMovies(value) {
    startPreloader();
    setRenderedSavedMovies([]);
    setShortSavedMovies(savedMovies.filter((item) => item.duration < 40 ? item : null));
    if (localStorage.getItem("checkbox")) {
        let searchMovie = shortSavedMovies.filter((item) => item.nameRU.toLowerCase().includes(value.toLowerCase()) ? item : null);
        setRenderedSavedMovies(searchMovie);
      } else {
        let searchMovie = savedMovies.filter((item) => {
          return item.nameRU.toLowerCase().includes(value.toLowerCase()) ? item : null; });
        setRenderedSavedMovies(searchMovie);
      }
  }

  function saveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((res) => {
        const updatedSavedMovies = [...savedMovies, { ...res, id: res.movieId }];
        setSavedMovies(updatedSavedMovies);
        setShortSavedMovies(updatedSavedMovies.filter((item) => item.duration < 40 ? item : null));
        localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
      })
      .catch(err => console.log(err));
  }

  function deleteMovie(movie) {
    const deleteCard = savedMovies.find(c => c.movieId === (movie.id || movie.movieId) && c.owner === currentUser._id);
    mainApi.deleteMovie(deleteCard._id)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter(item => item._id !== deleteCard._id);
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    if (loggedIn) {
      if (!localStorage.getItem("savedMovies")) {
        mainApi.getSavedMovies()
          .then((res) => {
            // const findSavedMovies = res.filter((m) => m.owner._id === currentUser._id);
            setSavedMovies(res);
            localStorage.setItem("savedMovies", JSON.stringify(res));
          })
          .catch((err) => console.log(err))
      } else {
        const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
        setSavedMovies(savedMovies);
      }
    }
  }, [loggedIn])

  useEffect(() => {
    if (!localStorage.getItem("apiMovies")) {
      moviesApi.getMovies()
        .then((movies) => {
          setApiMovies(movies);
          localStorage.setItem("apiMovies", JSON.stringify(movies));
        })
        .catch(() => setErrorMessage("Ошибка получения данных. Подождите и попробуйте еще раз."));
    } else {
      const movies = JSON.parse(localStorage.getItem("apiMovies"));
      setApiMovies(movies);
    }
    setShortMovies(apiMovies.filter((item) => item.duration < 40 ? item : null));
  }, [loggedIn])

  return (
    <div className="App">
      <CurrentUserContext.Provider value={ currentUser }>
          <Routes>
            <Route path={'/'} element={
              <>
                <Header loggedIn={loggedIn}/>
                <Main />
                <Footer />
              </>
            }>
            </Route>

            <Route exact path={'/signup'} element={
              <Register
                handleRegister={handleRegister}
                errorMessageReg={errorMessageReg}
              />
            }>
            </Route>

            <Route exact path={'/signin'} element={
              <Login
                handleLogin={handleLogin}
                errorMessageLog={errorMessageLog}
              />
            }>
            </Route>

            <Route path={'/profile'} element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <Header loggedIn={loggedIn}/>
                  <Profile
                    errMessageProfile={errorMessageProfile}
                    handleUpdateDataUser={handleUpdateUser}
                    handleLogout={handleLogout}
                  />
                </>
              </ProtectedRoute>
            }>
            </Route>

            <Route path={'/movies'} element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <Header loggedIn={loggedIn}/>
                  <Movies
                    errorMessage={errorMessage}
                    loading={loading}
                    movies={renderedMovies}
                    onSearch={findMovies}
                    handleSavedMovie={saveMovie}
                    handleDeleteMovie={deleteMovie}
                    savedMovies={savedMovies}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }>
            </Route>
            <Route path={'/saved-movies'} element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <Header loggedIn={loggedIn}/>
                  <SavedMovies
                    movies={savedMovies}
                    handleDeleteMovies={deleteMovie}
                    onSearch={findSavedMovies}
                    loading={loading}
                    renderedMovies={renderedSavedMovies}
                  />
                  <Footer />
                </>
              </ProtectedRoute>

            }>
            </Route>

            <Route path={'*'} element={
              <NotFound />
            }>
            </Route>

          </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
