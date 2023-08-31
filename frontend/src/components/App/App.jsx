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
  //сообщения об ошибках
  //на страницах регистрации и авторизации
  const [requestMessage, setRequestMessage] = React.useState("");
  const [isShortMovies, setIsShortMovies] = React.useState(false);
  const [isShortSavedMovies, setIsShortSavedMovies] = React.useState(false);
  const { isWideScreen, isMiddleScreen, isNarrowScreen } = useResize(); 
  //получение значения от кастомного хука
  

  const navigate = useNavigate();

  const path = useLocation();


  //////////////////useEffects//////////////////////////////////

  // после авторизации получить фильмы и данные пользователя
  // наверное сюда же нужно добавить сохраненные фильмы
  //checkToken заменить на получение сохраненных фильмов

  function handleSearchMovie(string) {
    // console.log('запущена функция handleSearchMovie')
    setShowPreloader(true);
    moviesApi
      .getMovies()
      .then((allMovies) => {
        // const d = ["nameRU", "nameEn"];
        //в идеале надо определять язык и и скать на этом языке, подумаю об этом после сдачи диплома
        const films = allMovies.filter((movie) => {
          return (
          movie.nameRU.toLowerCase().includes(string.toLowerCase())
          )
        })
        setMovies(films);
        // console.log(films.length)
        
        // localStorage.setItem()
      })
      .catch(console.error)
      .finally(() => {
        setShowPreloader(false);
      });
  }
  // console.log(movies.length)

  React.useEffect(() => { // получение currentuser
    if (isLoggedIn) {
      //     setShowPreloader(true);
      //     // Promise.all([moviesApi.getMovies() ])
      //     moviesApi
      //       .getMovies()
      //       .then((movies) => { 
      //         const films = JSON.parse(localStorage.getItem("movies")) || [];
      //         if (!films.length === 0) {
      //           localStorage.setItem('movies', JSON.stringify(movies)) //тут не добавляется
      //         }
      //         setMovies(movies || []);
      setCurrentUser({ name: "Анастасия", email: "mail@mail.com" }); 
      //зарегистрированному пользователю в инпутах форм будут показаны его данные

      //         //данные пользователя записать в currentUser
      //         // setCurrentUser(user);
      //         //и наверное в сторадж
      //       })
      //       .catch(console.error)
      //       .finally(() => {
      //         setShowPreloader(false);
      //       });
    }
  }, [isLoggedIn]);

  //проверка главная ли страница для функции отображения хэдера
  useEffect(() => {
    path.pathname === "/" ?
      setIsMainPage(true) :
      setIsMainPage(false);
  }, [path]);

  //удалить сообщение от сервера по таймеру
  useEffect(() => {
    if (requestMessage) {
      setTimeout(() => {
        setRequestMessage("")
      }, 5000);
    }

  }, [requestMessage]);

  //////////////////useEffects//////////////////////////////////
  ///////////////////handlers///////////////////////////////////

  //функция открытия/закрытия попапа
  function handleOpenClosePopup() {
    // поменять значение на противоположное
    setIsOpenPopup(!isOpenPopup);
    document.querySelector(".burger").classList.toggle('open');
    /*после сдачи всех этапов добавить переключатель стиля для запрета прокрутки попапа*/
  };


  ///////////////////handlers auth///////////////////////////////////

  function checkToken() {
    setShowPreloader(true);
    auth
      .checkToken()
      .then((user) => { //проверить что пришло
        setCurrentUser(user);
        //записать в сторадж
      })
      .catch((err) => {
        console.log(err);

      })
      .finally(() => {

        setShowPreloader(false);
      });

  }

  //регистрация 
  function handleRegister({ name, email, password }) {
    setShowPreloader(true);
    auth
      .register({ name, email, password })
      .then((res) => {
        handleLogin({ name, email }) // совместить с авторизацией

        //уведомление о удачной регистрации не нужно
      })
      .then((res) => {
        // navigate("/movies", { replace: true }); //подумать почему здесь происходит перенаправление в любом случае
        console.log()
      })
      .catch((err) => {
        console.log(err);
        setRequestMessage(err);
        //уведомление о неудачной регистрации на странице с фильмами добавить
      })
      .finally(() => {

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
        setCurrentUser(res) //проверить что там сохраняется
      })
      .then((res) => {
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        setRequestMessage(err);
        //уведомление о неудачной регистрации на странице с фильмами добавить
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
        setCurrentUser(res)//проверить что пришло
        setRequestMessage(res);
        // уведомление в профиле
      })
      .catch((err) => {
        console.log(err);
        setRequestMessage(err);
        // setUserMessage("Что-то пошло не так! Попробуйте ещё раз.");
        // уведомление в профиле
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


  function handlerChangeTumblerSavedMovies() {
    setIsShortSavedMovies(!isShortSavedMovies);
  }

  // console.log(isShortSavedMovies)

  // function handlerChangeTumbler(e) {
  //   e.preventDefault();
  //   console.log('сработала handlerChangeTumbler')
  //   setIsShortMovies(!isShortMovies);
  // }

  // console.log(isShortMovies,'isShortMovies')


  // useEffect((isShortMovies) => {
  //   // console.log('сработал юзэффект', isShortMovies, 'isShortMovies')

  //   if (isShortMovies && movies.length > 0) { // && movies.length > 0
  //     const shortFilteredFilms = movies.filter((movie) => {
  //       return (
  //         movie.duration <= 40
  //       )
  //     })
  //     setMovies(shortFilteredFilms);
  //     console.log(shortFilteredFilms)
  //   }
  // }, [isShortMovies, movies]);


  ///////////////////handlers movies/////////////////////////////////


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
                    requestMessage={requestMessage}
                  // setAuthRequestError={setAuthRequestError}
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
                    requestMessage={requestMessage}
                  // setAuthRequestError={setAuthRequestError}
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
                          handleSearchMovie={handleSearchMovie}
                          requestMessage={requestMessage}
                          isShortMovies={isShortMovies}
                          // handlerChangeTumbler={handlerChangeTumbler}
                          setIsShortMovies={setIsShortMovies}
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
                          movies={savedMovies}
                          handleSaveMovie={handleSaveMovie}
                          handleSearchMovie={handleSearchMovie}
                          requestMessage={requestMessage}
                          // isShortSavedMovies={isShortSavedMovies}
                          // setIsShortSavedMovies={setIsShortSavedMovies}
                          handlerChangeTumblerSavedMovies={handlerChangeTumblerSavedMovies}
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
                          requestMessage={requestMessage}
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
