import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import * as moviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";

function App() {
  const [tokenChecked, setTokenChecked] = useState(false);
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
  const [basicMovies, setBasicMovies] = React.useState(JSON.parse(localStorage.getItem("basicMovies")) || []);
  const [movies, setMovies] = React.useState(JSON.parse(localStorage.getItem("movies")) || []);
  const [savedMovies, setSavedMovies] = React.useState(JSON.parse(localStorage.getItem("savedMovies")) || []);
  //сообщения об ошибках
  const [requestMessage, setRequestMessage] = React.useState("");
  const [isShortMovies, setIsShortMovies] = React.useState(JSON.parse(localStorage.getItem("isShortMovies")) || false);
  const [isShortSavedMovies, setIsShortSavedMovies] = React.useState(false); //переписать и обойтись без него
  // отфильтрованные короткометражки на странице с фильмами
  const [shortFilteredMovies, setShortFilteredMovies] = React.useState(JSON.parse(localStorage.getItem("shortFilteredMovies")) || []);
  // отфильтрованные короткометражки на странице с сохраненными фильмами
  const [shortFilteredSavedMovies, setShortFilteredSavedMovies] = React.useState(JSON.parse(localStorage.getItem("shortFilteredSavedMovies")) || []);

  //получение значения от кастомного хука
  const { isWideScreen } = useResize();
  const navigate = useNavigate();
  const path = useLocation();

  useEffect(() => {
    localStorage.setItem("isShortMovies", JSON.stringify(isShortMovies))
  }, [isShortMovies])

  //получение сохраненных фильмов из бд
  useEffect(() => {
    if (isLoggedIn) {
      MainApi
        .getInitialMovies()
        .then((films) => {
          const deleteIconMovies = films.map((film) => {
            return {
              ...film, buttonLikeType: "delete", key: film._id
              //доп свойство для присваивания класса type delete
            }
          })
          setSavedMovies(deleteIconMovies); //измененные фильмы с иконкой удаления savedMovies
          localStorage.setItem("savedMovies", JSON.stringify(deleteIconMovies)) //savedMovies
        })
        .catch(console.error)
        // .finally(() => {
        // });
    }
  }, [isLoggedIn])

  // проверка авторизован ли пользователь
  // если его данные сохранились с прошлой сессии
  useEffect(() => {
    auth
      .checkToken()
      .then((user) => {
        console.log(user)
        setIsLoggedIn(true);
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
        //зарегистрированному пользователю в инпутах форм 
        //будут показаны его данные
      })
      .catch((err) => { 
        // если кука истекла, удалить все данные как при разлогировании
        setIsLoggedIn(false);
        setCurrentUser({
          name: "",
          email: "",
          password: "",
        });
        localStorage.removeItem("isShortMovies");
        localStorage.removeItem("films");
        localStorage.removeItem("moviesSearchQuery");
        console.log(err);
      })
      .finally(() => {
        setTokenChecked(true);
      });
  }, []);

  //проверка главная ли страница для функции отображения хэдера
  useEffect(() => {
    path.pathname === "/" ?
      setIsMainPage(true) :
      setIsMainPage(false);
  }, [path]);

  //удалить сообщение от сервера в компоненте RequestMessage по таймеру
  // (бегущая строка)
  useEffect(() => {
    if (requestMessage) {
      setTimeout(() => {
        setRequestMessage("")
      }, 3000);
    }
  }, [requestMessage]);

  //функция открытия/закрытия попапа
  function handleOpenClosePopup() {
    // поменять значение на противоположное
    setIsOpenPopup(!isOpenPopup);
    document.querySelector(".burger").classList.toggle('open');
    /*TODO: после сдачи всех этапов добавить переключатель стиля для запрета прокрутки попапа*/
    //и найти пропавшую анимацию
  };

  //регистрация
  function handleRegister({ name, email, password }) {
    auth
      .register({ name, email, password })
      .then(() => {
        handleLogin({ email, password })
        //происходит перенаправление на movies через функцию авторизации
      })
      .catch((err) => {
        console.log(err);
        setRequestMessage(err || "");
        //уведомление о неудачной регистрации на странице с фильмами добавить
      })
      // .finally(() => {
      // });
  }

  //авторизация 
  function handleLogin({ email, password }) {
    auth
      .login({ email, password })
      .then((res) => {
        console.log(res, "должен быть объект пользователя") //должен быть объект пользователя
        setIsLoggedIn(true);
        setCurrentUser(res);
        localStorage.setItem("currentUser", JSON.stringify(res))
      })
      .then(() => {
        navigate("/movies", { replace: true });
        //навигация после авторизации потому что функция авторизации асинхронная 
        // и если пользователь попадет на сайт раньше, чем произойдет авторизация, 
        // он снова будет перенаправлен на главную
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        setRequestMessage(err || "");
      })
      // .finally(() => {
      // });
  }

  //изменить данные профиля
  function handleChangeProfile({ name, email }) {
    auth
      .updateUser({ name, email })
      .then((res) => {
        setCurrentUser(res)
        localStorage.setItem("currentUser", JSON.stringify(
          //заменить только измененные поля
            res.name ? { name: res.name } : { name: "" },
            res.email ? { email: res.email } : { email: "" }
        ))
        setRequestMessage('Данные успешно изменены');
        // уведомление в профиле
      })
      .catch((err) => {
        console.log(err);
        setRequestMessage(err || "");
        // уведомление в профиле
      })
      .finally(() => {
      });
  }

  //выйти
  function handleDeleteToken() {
    auth.logOut()
      .then(() => setCurrentUser({
        name: "",
        email: "",
        password: "",
      }))
      .then(() => setIsLoggedIn(false))
      .then(() => {
        localStorage.removeItem("isShortMovies");
        localStorage.removeItem("films");
        localStorage.removeItem("moviesSearchQuery");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      });
  };

  // поиск на странице с сохраненными фильмами

  // (state) => state.filter((c) => c._id !== deleteMovie._id)
  function handleSearchSavedMovie(string) {
    const films =
      savedMovies.filter((movie) => {
        return (
          movie.nameRU.toLowerCase().includes(string.toLowerCase())
          || movie.nameEN.toLowerCase().includes(string.toLowerCase())
        )
      })
    setSavedMovies(films);
    setRequestMessage(films.length > 0 ? "" : "Ничего не найдено");
  }

  // основная функция поиска фильмов TODO:рефакторить
  function handleSearchMovie(string) {

    if (basicMovies.length === 0) { // если карточек нет, получить
      setShowPreloader(true);
      moviesApi
        .getMovies()
        .then((cards) => {
          console.log(cards, "данные от сервера")
          setBasicMovies(cards) //это стейт basicMovies
          //начало функции поиска фильмов
          const putLikeButtons = cards.map((movie) => {
            const savedMovieLike = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id)
            if (savedMovieLike) {
              return {
                ...movie, buttonLikeType: "liked", key: movie.id
              }
            }
            return { ...movie, buttonLikeType: "unliked", key: movie.id }
          })
          console.log(putLikeButtons, "putLikeButtons") //+
          const items = //это films
            putLikeButtons.filter((movie) => { //измененные movies с добавленным свойством
              console.log(movie)
              return (
                movie.nameRU.toLowerCase().includes(string.toLowerCase())
                || movie.nameEN.toLowerCase().includes(string.toLowerCase())
              )
            })
          console.log(items)
          setMovies(items);
          localStorage.setItem("films", JSON.stringify(items));
          setRequestMessage(items.length > 0 ? "" : "Ничего не найдено");
          //конец функции поиска фильмов
        })
        .catch((err) => {
          console.log(err)
          setRequestMessage(err, `Во время запроса произошла ошибка. 
          Возможно, проблема с соединением или сервер недоступен. 
          Подождите немного и попробуйте ещё раз`)//пока так
        })
        .finally(() => {
          setShowPreloader(false);

          // searchMovies(string)//вызов второй функции
        })
    }
    else {//начало блока else
      const putLikeButtons = basicMovies.map((movie) => {
        const savedMovieLike = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id)
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
      localStorage.setItem("films", JSON.stringify(films));
      setRequestMessage(films.length > 0 ? "" : "Ничего не найдено");
    }//конец блока else
  };

  //функция сохранения фильма
  function handleSaveMovie(movie) {
    MainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setMovies((state) => state.map((elem) => elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem))
        setShortFilteredMovies((state) => state.map((elem) => elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem))
        newMovie.buttonLikeType = "delete"
        setSavedMovies((state) => [...state, newMovie])
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      });
  }

  function handleDeleteMovie(id) {
    const deleteMovie = savedMovies.find((savedMovie) => savedMovie.movieId === id)
    MainApi
      .deleteCard(deleteMovie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== deleteMovie._id))
        setMovies((state) => state.map((elem) => elem.id === id ? { ...elem, buttonLikeType: "unliked", key: elem.id } : elem))
        setShortFilteredMovies((state) => state.map((elem) => elem.id === id ? { ...elem, buttonLikeType: "unliked", key: elem.id } : elem))
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
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
  }, [isShortSavedMovies, savedMovies]);

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
  }, [isShortMovies, movies]);

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
                            setRequestMessage={setRequestMessage}
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
                            handleSearchMovie={handleSearchSavedMovie} //отличается от movies
                            requestMessage={requestMessage}
                            setRequestMessage={setRequestMessage}
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
