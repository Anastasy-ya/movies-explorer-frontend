import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
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
import RequestMessage from "../RequestMessage/RequestMessage";

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
  // const [isRegistered, setIsRegistered] = useState(false);
  // базовые фильмы, этот стейт не меняется в коде
  const [basicMovies, setBasicMovies] = React.useState([]);
  //отфильтрованные основные фильмы
  const [movies, setMovies] = React.useState(JSON.parse(localStorage.getItem("movies")) || []);
  // базовые фильмы для сохраненных, обновляется при лайке
  const [savedMovies, setSavedMovies] = React.useState(JSON.parse(localStorage.getItem("savedMovies")) || []);
  const [savedFilteredMovies, setSavedFilteredMovies] = React.useState(JSON.parse(localStorage.getItem("savedFilteredMovies")) || []);
  //сообщения об ошибках
  const [requestMessage, setRequestMessage] = React.useState("");
  const [isShortMovies, setIsShortMovies] = React.useState(JSON.parse(localStorage.getItem("isShortMovies")) || false);
  const [isShortSavedMovies, setIsShortSavedMovies] = React.useState(false); //переписать и обойтись без него
  // отфильтрованные короткометражки на странице с фильмами
  const [shortFilteredMovies, setShortFilteredMovies] = React.useState(JSON.parse(localStorage.getItem("shortFilteredMovies")) || []);
  // отфильтрованные короткометражки на странице с сохраненными фильмами
  const [shortFilteredSavedMovies, setShortFilteredSavedMovies] = React.useState(JSON.parse(localStorage.getItem("shortFilteredSavedMovies")) || []);
  const [isOpenConfirmationPopup, setIsOpenConfirmationPopup] = useState(false);

  //получение значения от кастомного хука
  const { isWideScreen } = useResize();
  const navigate = useNavigate();
  const path = useLocation();

  useEffect(() => {
    localStorage.setItem("isShortMovies", JSON.stringify(isShortMovies))
  }, [isShortMovies])

  function openPopup(string) {
    setRequestMessage(string);
    setIsOpenConfirmationPopup(true);
  }

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
  useEffect(() => {
    if (isOpenConfirmationPopup) {
      setTimeout(() => {
        setIsOpenConfirmationPopup(false)
      }, 3000);
    }
  }, [isOpenConfirmationPopup]);

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
    return auth
      .register({ name, email, password })
      .then((res) => {
        console.log(res, 'res')
        handleLogin({ email, password })
      })
  };

  //авторизация 
  function handleLogin({ email, password }) {
    return auth
      .login({ email, password })
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser({ email, password });
        localStorage.setItem("currentUser", JSON.stringify({ email, password }))
      })
      .then(() => {
        navigate("/movies", { replace: true });
        //навигация после авторизации потому что функция авторизации асинхронная 
        // и если пользователь попадет на сайт раньше, чем произойдет авторизация, 
        // он снова будет перенаправлен на главную
      })
  }

  //изменить данные профиля
  function handleChangeProfile({ name, email }) {
    return auth
      .updateUser({ name, email })
      .then((res) => {
        setCurrentUser(res)
        localStorage.setItem("currentUser", JSON.stringify(
          //заменить только измененные поля
          res.name ? { name: res.name } : { name: "" },
          res.email ? { email: res.email } : { email: "" }
        ))
        setRequestMessage('Данные успешно изменены');
        setIsOpenConfirmationPopup(true);
        // уведомление в профиле
      })
      .catch((err) => {
        console.log(err);
        setRequestMessage(err || "");
        setIsOpenConfirmationPopup(true);
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
        localStorage.removeItem("savedFilteredMovies");
        localStorage.removeItem("movies");
        localStorage.removeItem("savedMovies");
        localStorage.removeItem("moviesSearchQuery");
        localStorage.removeItem("shortFilteredSavedMovies");
        localStorage.removeItem("shortFilteredMovies");
        localStorage.removeItem("isShortMovies");
        localStorage.removeItem("savedMoviesSearchQuery");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("savedFilteredMovies");
        localStorage.removeItem("basicMovies");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      });
  };

  // поиск на странице с сохраненными фильмами
  function handleSearchSavedMovie(string) {
    const films =
      savedMovies.filter((movie) => {
        return (
          movie.nameRU.toLowerCase().includes(string.toLowerCase())
          || movie.nameEN.toLowerCase().includes(string.toLowerCase())
        )
      })
    setSavedFilteredMovies(films || []);
    localStorage.setItem("savedFilteredMovies", JSON.stringify(films))
    if (films.length === 0) {
      setRequestMessage("Ничего не найдено");
      setIsOpenConfirmationPopup(true);
    }
  }

  // handleSearchMovie
  // основная функция поиска фильмов TODO:рефакторить
  function handleSearchMovie(string) {
    if (basicMovies.length === 0) { // если карточек нет, получить
      setShowPreloader(true);
      moviesApi
        .getMovies()
        .then((cards) => {
          setBasicMovies(cards)
          localStorage.setItem("basicMovies", JSON.stringify({ cards }))
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
          const items = //это films
            putLikeButtons.filter((movie) => { //измененные movies с добавленным свойством
              return (
                movie.nameRU.toLowerCase().includes(string.toLowerCase())
                || movie.nameEN.toLowerCase().includes(string.toLowerCase())
              )
            })
          setMovies(items);
          //найденные фильмы movies
          localStorage.setItem("movies", JSON.stringify(items));
          if (items.length === 0) {
            openPopup("Ничего не найдено"); //
          }
          //конец функции поиска фильмов
        })
        .catch((err) => {
          console.log(err)
          openPopup(err, `Во время запроса произошла ошибка. 
          Возможно, проблема с соединением или сервер недоступен. 
          Подождите немного и попробуйте ещё раз`);
        })
        .finally(() => {
          setShowPreloader(false);
          //вызов второй функции
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
      localStorage.setItem("savedMovies", JSON.stringify(films));
      if (films.length === 0) {
        openPopup("Ничего не найдено");
      }
    }//конец блока else
  };



  //функция сохранения фильма +
  function handleSaveMovie(movie) {
    MainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setMovies((state) => state.map((elem) => elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem));
        setShortFilteredMovies((state) => state.map((elem) => elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem));
        newMovie.buttonLikeType = "delete"
        setSavedMovies((state) => [...state, newMovie])
        setShortFilteredSavedMovies((state) => [...state, newMovie]);
        //прибавляет новый фильм к массиву имеющихся
        //обновить в LS этот массив
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      });
  }

  // удаление из сохраненных +
  function handleDeleteMovie(id) {
    const deleteMovie = savedMovies.find((savedMovie) => savedMovie.movieId === id)
    MainApi
      .deleteCard(deleteMovie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== deleteMovie._id))
        setMovies((state) => state.map((elem) => elem.id === id ? { ...elem, buttonLikeType: "unliked", key: elem.id } : elem))
        setShortFilteredMovies((state) => state.map((elem) => elem.id === id ? { ...elem, buttonLikeType: "unliked", key: elem.id } : elem))
        setShortFilteredSavedMovies((state) => state.filter((c) => c._id !== deleteMovie._id));
      })
      .catch((err) => {
        console.log(err);
      })

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
    else if (isShortSavedMovies && savedMovies.length === 0) {
      setShortFilteredSavedMovies([]);
      openPopup("Ничего не найдено");
    }
  }, [isShortSavedMovies, savedMovies]);



  // тумблер "короткометражки" на странице с фильмами
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
    else if (isShortMovies && movies.length === 0) {
      setShortFilteredMovies([]);
      openPopup("Ничего не найдено")
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
                element={isLoggedIn ? <Navigate to="/" /> : (
                  <main className="content">
                    <Register
                      handleRegister={handleRegister}
                      formName={"signup"}
                      buttonText={"Зарегистрироваться"}
                      wellcomeText={"Добро пожаловать!"}
                      askToChangeForm={"Уже зарегистрированы? "}
                      askToChangeFormLink={"Войти"}
                      routTo={"/signin"}
                      requestMessage={requestMessage}
                      setRequestMessage={setRequestMessage}
                      setIsOpenConfirmationPopup={setIsOpenConfirmationPopup}
                    />
                  </main>
                )}
              />

              <Route
                path="/signin"
                element={isLoggedIn ? <Navigate to="/" /> : (
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
                      setRequestMessage={setRequestMessage}
                      setIsOpenConfirmationPopup={setIsOpenConfirmationPopup}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  </main>
                )}
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
                            isShortSavedMovies={isShortSavedMovies}
                            setIsShortSavedMovies={setIsShortSavedMovies}
                            handleDeleteMovie={handleDeleteMovie}
                            setShortFilteredMovies={setShortFilteredMovies}
                            setIsOpenConfirmationPopup={setIsOpenConfirmationPopup}
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
                            isShortSavedMovies={isShortSavedMovies}
                            setIsShortSavedMovies={setIsShortSavedMovies}
                            setIsOpenConfirmationPopup={setIsOpenConfirmationPopup}
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

            <RequestMessage //редактирование имени польз
              isOpenConfirmationPopup={isOpenConfirmationPopup}
              requestMessage={requestMessage}
              setIsOpenConfirmationPopup={setIsOpenConfirmationPopup}
            />

          </CurrentUserContext.Provider>
        </div>
      }
    </div>
  );
}

export default App;
