import React from "react";
import { Route, Routes, } from "react-router-dom";
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import Preloader from '../Movies/Preloader/Preloader';
import SavedMovies from '../SavedMovies/SavedMovies';
import movies from '../../utils/moviesData.js'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={
          <>
            <Header />
            <Main />
            <Footer />
          </>
        }>
        </Route>

        <Route exact path={'/signup'} element={
         <Register />
        }>
        </Route>

        <Route exact path={'/signin'} element={
          <Login />
        }>
        </Route>

        <Route path={'/profile'} element={
          <>
            <Header loggedIn={true}/>
            <Profile />
          </>

        }>
        </Route>

        <Route path={'/movies'} element={
          <>
            <Header loggedIn={true}/>
            <Movies moviesData={movies} />
            <Footer />
          </>
        }>
        </Route>
        <Route path={'/saved-movies'} element={
          <>
            <Header loggedIn={true}/>
            <SavedMovies moviesData={movies} />
            <Footer />
          </>
        }>
        </Route>

        <Route path={'test'} element={
          <Preloader />
        }>
        </Route>
        <Route path={'*'} element={
            <NotFound />
          }>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
