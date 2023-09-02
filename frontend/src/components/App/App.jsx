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
import deleteLocalStorage from "../../utils/consts";

import * as MainApi from "../../utils/MainApi";

function App() {
  const [tokenChecked, setTokenChecked] = useState(false); //костыль

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const [isMainPage, setIsMainPage] = useState(false);
  // фильмы и сохраненные фильмы
  const [movies, setMovies] = React.useState(() => {
    const checkStorage = localStorage.getItem("films");
    return checkStorage ? JSON.parse(checkStorage) : []
  });
  const [savedMovies, setSavedMovies] = React.useState([]);
  // const [isLiked, setIsLiked] = React.useState(false);
  //сообщения об ошибках
  const [requestMessage, setRequestMessage] = React.useState("");
  const [isShortMovies, setIsShortMovies] = React.useState(() => {
    const checkStorage = localStorage.getItem("isShortMovies");
    return checkStorage ? JSON.parse(checkStorage) : false
  });
  const [isShortSavedMovies, setIsShortSavedMovies] = React.useState(false); //аналогично
  // отфильтрованные короткометражки на странице с фильмами
  const [shortFilteredMovies, setShortFilteredMovies] = React.useState([]);
  // отфильтрованные короткометражки на странице с сохраненными фильмами
  const [shortFilteredSavedMovies, setShortFilteredSavedMovies] = React.useState([]);
 
  //получение значения от кастомного хука
  const { isWideScreen, isMiddleScreen, isNarrowScreen } = useResize();

  console.log(savedMovies)

  const navigate = useNavigate();
  const path = useLocation();

  useEffect(() => {
    localStorage.setItem("isShortMovies", JSON.stringify(isShortMovies))
  }, [isShortMovies])

  //получение сохраненных фильмов из бд
  useEffect(() => {
    if (isLoggedIn) {
      setShowPreloader(true);
      MainApi
        .getInitialMovies()
        .then((films) => {
          const deleteIconMovies = films.map((film) => {
            return {
              ...film, buttonLikeType: "delete", key: film._id //доп свойство для присваивания класса type delete
            }
          })
          setSavedMovies(deleteIconMovies); //измененные фильмы с иконкой удаления
        })
        .catch(console.error)
        .finally(() => {
          setShowPreloader(false);
        });
    }
  }, [isLoggedIn])

  // проверка зарегистрирован ли пользователь
  useEffect(() => {
    setShowPreloader(true);
    auth
      .checkToken()
      .then((user) => {
        setIsLoggedIn(true)
        setCurrentUser(user);
        //зарегистрированному пользователю в инпутах форм будут показаны его данные
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTokenChecked(true);
        setShowPreloader(false);
      });
  }, []);

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

  //функция открытия/закрытия попапа
  function handleOpenClosePopup() {
    // поменять значение на противоположное
    setIsOpenPopup(!isOpenPopup);
    document.querySelector(".burger").classList.toggle('open');
    /*после сдачи всех этапов добавить переключатель стиля для запрета прокрутки попапа*/
  };

  //регистрация
  function handleRegister({ name, email, password }) {
    setShowPreloader(true);
    auth
      .register({ name, email, password })
      .then((res) => {
        handleLogin({ email, password })
        //происходит перенаправление на movies через функцию авторизации
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
  function handleLogin({ email, password }) {
    setShowPreloader(true);
    auth
      .login({ email, password })
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res)
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
  function handleChangeProfile({ name, email }) {
    setShowPreloader(true);
    auth
      .updateUser({ name, email })
      .then((res) => {
        setCurrentUser({ name, email })
        // setRequestMessage(res);
        // уведомление в профиле
      })
      .catch((err) => {
        console.log(err);
        setRequestMessage(err);
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
      .then(() => setIsLoggedIn(false))
      .then(() => {
        // deleteLocalStorage(); //дописать найденные и сохраненные фильмы, состояние переключателя и поисковую строку,
        // deleteLocalStorage();
        // deleteLocalStorage();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowPreloader(false);
      });
  };

  // поиск на странице с сохраненными фильмами
  function handleSearchSavedMovie(string) {
    setShowPreloader(true);
    const films =
      savedMovies.filter((movie) => {
        return (
          movie.nameRU.toLowerCase().includes(string.toLowerCase())
          || movie.nameEN.toLowerCase().includes(string.toLowerCase())
        )
      })
    setSavedMovies(films);
    setShowPreloader(false);
  }

  // поиск на странице с фильмами
  function handleSearchMovie(string) {
    setShowPreloader(true);
    moviesApi
      .getMovies()
      .then((allMovies) => {
        //в идеале надо определять язык и и скать на этом языке, подумаю об этом после сдачи диплома
        const putLikeButtons = allMovies.map((movie) => {
          const savedMovieLike = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id)
          //сравнить код из базы с id входящего фильма
          if (savedMovieLike) {
            return {
              ...movie, buttonLikeType: "liked", key: movie.id
            }
          }
          return { ...movie, buttonLikeType: "unliked", key: movie.id }
        })
        const films =
          putLikeButtons.filter((movie) => { //измененные movies с добавленным свойством
            return (
              movie.nameRU.toLowerCase().includes(string.toLowerCase())
              || movie.nameEN.toLowerCase().includes(string.toLowerCase())
            )
          })
        setMovies(films);
        localStorage.setItem("films", JSON.stringify(films)); // потом достать и вставить в новый стейт
      })
      .catch(console.error)
      .finally(() => {
        setShowPreloader(false);
      });
  }

  //функция сохранения фильма
  function handleSaveMovie(movie) {
    setShowPreloader(true);
    MainApi
      .saveMovie(movie)
      .then((newMovie) => { //ошибка валидации
        // console.log(newMovie)
        setMovies((state) => state.map((elem) => elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem ))
        setShortFilteredMovies((state) => state.map((elem) => elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem ))
        newMovie.buttonLikeType = "delete"
        setSavedMovies((state) => [...state, newMovie])

      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowPreloader(false);
      });
  }



  function handleDeleteMovie(id) {
    setShowPreloader(true);
    console.log(id, 'id')
    const deleteMovie = savedMovies.find((savedMovie) => savedMovie.movieId === id)
    console.log(deleteMovie._id, 'deleteMovie', deleteMovie)
    MainApi
      .deleteCard(deleteMovie._id)
      .then(() => {
        console.log('карточка удалена')
        setSavedMovies((state) => state.filter((c) => c._id !== deleteMovie._id))// ошибка
        setMovies((state) => state.map((elem) => elem.id === id ? { ...elem, buttonLikeType: "unliked", key: elem.id } : elem ))
        setShortFilteredMovies((state) => state.map((elem) => elem.id === id ? { ...elem, buttonLikeType: "unliked", key: elem.id } : elem ))
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowPreloader(false);
      });
  }

  //тумблер "короткометражки" на странице с сохраненными фильмами
  useEffect(() => {
    if (isShortSavedMovies && savedMovies.length > 0) {
      setShortFilteredSavedMovies(
        savedMovies.filter((savedmovie) => {
          return (
            savedmovie.duration <= 40
          )
        })
    )
    }
  }, [isShortSavedMovies]);

  //тумблер "короткометражки" на странице с фильмами
  useEffect(() => {
    if (isShortMovies && movies.length > 0) {
      setShortFilteredMovies(
        movies.filter((movie) => {
          return (
            movie.duration <= 40
          )
        })
      )
    }
  }, [isShortMovies]);

  return (
    <div className="root">
      {tokenChecked &&
        <div className="page">
          <CurrentUserContext.Provider
            value={currentUser || ""}>
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
                            movies={isShortMovies ? shortFilteredMovies : movies}
                            handleSaveMovie={handleSaveMovie}
                            handleSearchMovie={handleSearchMovie}
                            requestMessage={requestMessage}
                            isShortMovies={isShortMovies}
                            setIsShortMovies={setIsShortMovies}
                            handleDeleteMovie={handleDeleteMovie}

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
                            movies={isShortSavedMovies ? shortFilteredSavedMovies : savedMovies}
                            // handleSaveMovie={handleSaveMovie}
                            handleSearchMovie={handleSearchSavedMovie} //отличается от movies
                            requestMessage={requestMessage}
                            // handlerChangeTumblerSavedMovies={handlerChangeTumblerSavedMovies}
                            handleDeleteMovie={handleDeleteMovie}
                            isShortMovies={isShortSavedMovies}
                            setIsShortMovies={setIsShortSavedMovies}
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
      }
    </div>
  );
}

export default App;
