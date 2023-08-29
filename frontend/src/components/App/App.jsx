import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"; //, Navigate, useNavigate
import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import Preloader from "../Preloader/Preloader";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";
import { useResize } from "../../components/hooks/useResize";
import * as auth from "../../utils/auth";
import moviesApi from "../../utils/MoviesApi";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showPreloader, setShowPreloader] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const [isMainPage, setIsMainPage] = useState(false);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isLiked, setIsLiked] = React.useState(false);

  const { isWideScreen } = useResize(); //получение значения от кастомного хука

  const navigate = useNavigate();

  const path = useLocation();

  //////////////////useEffects//////////////////////////////////

  // после авторизации получить фильмы и данные пользователя
  // наверное сюда же нужно добавить сохраненные фильмы
  React.useEffect(() => {
    if (isLoggedIn) {
      setShowPreloader(true);
      Promise.all([moviesApi.getMovies(), auth.checkToken()])
      // moviesApi
      //   .getMovies()
        .then(({movies, user}) => { 
          const films = JSON.parse(localStorage.getItem("movies")) || [];
          if (!films.length === 0) {
            localStorage.setItem('movies', JSON.stringify(movies)) //тут не добавляется
          }
          setMovies(movies);
          //данные пользователя записать в currentUser
          setCurrentUser(user);
          //и наверное в сторадж
        })
        .catch(console.error)
        .finally(() => {
          setShowPreloader(false);
        });;
    }
  }, [isLoggedIn]);

  //проверка главная ли страница для функции отображения хэдера
  useEffect(() => {
    path.pathname === "/" ?
      setIsMainPage(true) :
      setIsMainPage(false);
  }, [path]);

  //////////////////useEffects//////////////////////////////////
  ///////////////////handlers///////////////////////////////////

  //функция сохранения фильма
  function handleSaveMovie(movie) {
    // const isLiked = movie.likes.some((i) => {
    //   return i === currentUser._id});
    // api
    //   .changeLikeCardStatus(card._id, isLiked)
    //   .then((newCard) => {
    //     setCards((state) =>
    //       state.map((c) => (c._id === card._id ? newCard : c))
    //     );
    //   })
    //   .catch(console.error);
  }

  //функция открытия/закрытия попапа
  function handleOpenClosePopup() {
    // поменять значение на противоположное
    setIsOpenPopup(!isOpenPopup);
    document.querySelector(".burger").classList.toggle('open');
    /*после сдачи всех этапов добавить переключатель стиля для запрета прокрутки попапа*/
  };

  
///////////////////handlers auth///////////////////////////////////

  //регистрация 
  function handleRegister({ name, email, password }) {
    setShowPreloader(true);
    auth
      .register({ name, email, password })
      .then((res) => {
        handleLogin({ name, email }) // совместить с авторизацией
        
        //уведомление о удачной регистрации на странице с фильмами
      })
      .catch((err) => {
        console.log(err);
        // setUserMessage("Что-то пошло не так! Попробуйте ещё раз.");
        //уведомление о неудачной регистрации на странице с фильмами
      })
      .finally(() => {
        navigate("/movies", { replace: true }); 
        //навигация после авторизации потому что функция авторизации асинхронная 
        // и если пользователь попадет на сайт раньше, чем произойдет авторизация, 
        // он снова будет перенаправлен на главную
        setShowPreloader(false);
      });
  }

  //авторизация
  function handleLogin({ name, email }) {
    setShowPreloader(true);
    auth
      .login({ name, email })
      .then((res) => {
        setIsLoggedIn(true);
        // navigate("/movies", { replace: true }); повтор
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        // setUserMessage("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        setShowPreloader(false);
      });
  }

  //изменить данные профиля
  // проверить после регистрации и авторизации
  function handleChangeProfile({ name, email }) {
    setShowPreloader(true);
    auth
      .updateUser({ name, email })
      .then((res) => {
        setCurrentUser({ name, email })
        // уведомление в профиле
      })
      .catch((err) => {
        console.log(err);
        // setIsLoggedIn(false);
        // setUserMessage("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        setShowPreloader(false);
      });
  }

  //выйти дописать удаление из сторадж
  function handleDeleteToken() {
    setShowPreloader(true);
    auth.logOut()
      .then(() => setCurrentUser({
        name: "",
        email: "",
        password: "",
      }))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowPreloader(false);
      });
    };

  ///////////////////handlers auth///////////////////////////////////
  ///////////////////handlers movies/////////////////////////////////



  ///////////////////handlers movies/////////////////////////////////
  ///////////////////handlers////////////////////////////////////////

  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser || ""}>
          {showPreloader && <Preloader />}
          <Routes>

            <Route
              path="*" //пользователь вошел на несуществующую страницу
              element={
                <main className="content">
                  <PageNotFound />
                </main>
              }
            />

            <Route
              path="/signup"
              element={
                <main className="content">
                  <Register
                    handleRegister={handleRegister}
                    formName={"signup"}
                    className={"auth-container__form"}
                    buttonText={"Зарегистрироваться"}
                    wellcomeText={"Добро пожаловать!"}
                    askToChangeForm={"Уже зарегистрированы? "}
                    askToChangeFormLink={"Войти"}
                    routTo={"/signin"}
                  // setCurrentUser={setCurrentUser}
                  // currentUser={currentUser}
                  />
                </main>
              }
            />

            <Route
              path="/signin"
              element={
                <main className="content">
                  <Login
                    handleLogin={handleLogin}
                    formName={"signin"}
                    className={"auth-container__form"}
                    buttonText={"Войти"}
                    wellcomeText={"Рады видеть!"}
                    askToChangeForm={"Ещё не зарегистрированы? "}
                    askToChangeFormLink={"Регистрация"}
                    routTo={"/signup"}
                  // setCurrentUser={setCurrentUser}
                  // currentUser={currentUser}
                  />
                </main>
              }
            />

            <Route
              path="/"
              element={
                <>
                  <Header
                    isLoggedIn={isLoggedIn}
                    handleOpenClosePopup={handleOpenClosePopup}
                    isOpenPopup={isOpenPopup}
                    isMainPage={isMainPage}
                    isWideScreen={isWideScreen}
                  />
                  <main className="content">
                    <Main
                      isLoggedIn={isLoggedIn}
                    />
                  </main>
                  <Footer />
                </>
              }
            />

            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={() => (
                    <>
                      <Header
                        isLoggedIn={isLoggedIn}
                        handleOpenClosePopup={handleOpenClosePopup}
                        isOpenPopup={isOpenPopup}
                        isMainPage={isMainPage}
                        isWideScreen={isWideScreen}
                      />
                      <main className="content">
                        <Movies
                          isLoggedIn={isLoggedIn}
                          movies={movies}
                          handleSaveMovie={handleSaveMovie}
                        />
                      </main>
                      <Footer />
                    </>
                  )}
                />
              }
            />

            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={() => (
                    <>
                      <Header
                        isLoggedIn={isLoggedIn}
                        handleOpenClosePopup={handleOpenClosePopup}
                        isOpenPopup={isOpenPopup}
                        isMainPage={isMainPage}
                        isWideScreen={isWideScreen}
                      />
                      <main className="content">
                        <SavedMovies
                          isLoggedIn={isLoggedIn}
                          movies={movies}
                          handleSaveMovie={handleSaveMovie}
                        />
                      </main>
                      <Footer />
                    </>
                  )}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={() => (
                    <>
                      <Header
                        isLoggedIn={isLoggedIn}
                        handleOpenClosePopup={handleOpenClosePopup}
                        isOpenPopup={isOpenPopup}
                        isMainPage={isMainPage}
                        isWideScreen={isWideScreen}
                      />
                      <main className="content">
                        <Profile
                          isLoggedIn={isLoggedIn}
                          routTo={"/"}
                          handleChangeProfile={handleChangeProfile}
                          handleDeleteToken={handleDeleteToken}
                        />
                      </main>
                    </>
                  )}
                />
              }
            />

          </Routes>

        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
