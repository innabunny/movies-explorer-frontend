import React, {useEffect, useState} from "react";
import { Navigate, Route, Routes, useLocation, useNavigate,} from "react-router-dom";
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
  // const [checkboxStatus, setCheckboxStatus] = useState(false);

  const [apiMovies, setApiMovies] = useState([]);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [renderedSavedMovies, setRenderedSavedMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [shortSavedMovies, setShortSavedMovies] = useState([]);

  const [savedMovies, setSavedMovies] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      mainApi.getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn])

  useEffect(() => {
    setRenderedSavedMovies([]);
    if (localStorage.getItem("lastFoundMovies")) {
      setRenderedMovies(JSON.parse(localStorage.getItem("lastFoundMovies")));
    }
  }, [location.pathname]);

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .getUserInfo(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
            navigate(location);
          }
        })
        .catch((err) => console.log(err));
    }
  }

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
    localStorage.clear();
    setLoggedIn(false);
    navigate('/');
  }

  function handleUpdateUser(name, email) {
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
        if (err.includes(409)) {
          setErrorMessageProfile('Пользователь с таким email уже существует');
        } else {
          setErrorMessageProfile('При обновлении профиля произошла ошибка');
        }
      })
      .finally(() => {
        setTimeout(() => setErrorMessageProfile(""), 2000);
      })
  }

  function findMovies(valueSearch, checkboxStatus) {
    startPreloader();
    localStorage.setItem("checkboxStatus", checkboxStatus);
    if (!localStorage.getItem("apiMovies")) {
      moviesApi.getMovies()
        .then((movies) => {
          setApiMovies(movies);
        })
        .then(() => {
          localStorage.setItem("apiMovies", JSON.stringify(apiMovies));
        })
        .catch(() => setErrorMessage("Ошибка получения данных. Подождите и попробуйте еще раз."));
    } else {
      const movies = JSON.parse(localStorage.getItem("apiMovies"));
      setApiMovies(movies);
    }

    if (checkboxStatus) {
        setShortMovies(apiMovies.filter((item) => item.duration < 40 ? item : null));
        let searchMovie = shortMovies.filter((item) => item.nameRU.toLowerCase().includes(valueSearch.toLowerCase()) ? item : null);
        setRenderedMovies(searchMovie);
        localStorage.setItem("lastFoundMovies", JSON.stringify(searchMovie));
      } else {
        let searchMovie = apiMovies.filter((item) => item.nameRU.toLowerCase().includes(valueSearch.toLowerCase()) ? item : null);
        setRenderedMovies(searchMovie);
        localStorage.setItem("lastFoundMovies", JSON.stringify(searchMovie));
      }
  }

  function findSavedMovies(valueSearch, checkboxStatus) {
    startPreloader();
    setShortSavedMovies(savedMovies.filter((item) => item.duration < 40 ? item : null));
    if (checkboxStatus) {
        let searchMovie = shortSavedMovies.filter((item) => item.nameRU.toLowerCase().includes(valueSearch.toLowerCase()) ? item : null);
        setRenderedSavedMovies(searchMovie);
      } else {
        let searchMovie = savedMovies.filter((item) => item.nameRU.toLowerCase().includes(valueSearch.toLowerCase()) ? item : null);
        setRenderedSavedMovies(searchMovie);
      }
  }

  function saveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((res) => {
        const updatedSavedMovies = [...savedMovies, { ...res, id: res.movieId }];
        setSavedMovies(updatedSavedMovies);
        setShortSavedMovies(updatedSavedMovies.filter((item) => item.duration < 40 ? item : null));
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

            <Route path={'/signup'} element={ loggedIn ?
              <Navigate replace to={"/movies"} /> :
              <Register
                handleRegister={handleRegister}
                errorMessageReg={errorMessageReg}
              />
            }>
            </Route>

            <Route exact path={'/signin'} element={ loggedIn ?
              <Navigate replace to={"/movies"} /> :
              <Login
                handleLogin={handleLogin}
                errorMessageLog={errorMessageLog}
              />
            }>
            </Route>

            <Route path={'/profile'} element={
              <ProtectedRoute loggedIn={loggedIn} >
                <>
                  <Header loggedIn={loggedIn}/>
                  <Profile
                    errMessageProfile={errorMessageProfile}
                    handleUpdateDataUser={handleUpdateUser}
                    handleLogout={handleLogout}
                    currentUser={currentUser}
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
