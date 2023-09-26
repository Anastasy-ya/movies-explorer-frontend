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

//TO DO перевести комментарии на английский

function App() {
  const [tokenChecked, setTokenChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
  });

  
  const [isMainPage, setIsMainPage] = useState(false);
  // const [isRegistered, setIsRegistered] = useState(false);
  // базовые фильмы, этот стейт не меняется в коде
  const [basicMovies, setBasicMovies] = React.useState([]);
  //отфильтрованные основные фильмы
  const [movies, setMovies] = React.useState(JSON.parse(localStorage.getItem("movies")) || []);
  // базовые фильмы для сохраненных, обновляется при лайке
  const [savedMovies, setSavedMovies] = React.useState(JSON.parse(localStorage.getItem("savedMovies")) || []);
  // результат поиска по сохраненным фильмам
  const [savedFilteredMovies, setSavedFilteredMovies] = React.useState([]);
  //сообщения об ошибках
  const [requestMessage, setRequestMessage] = React.useState("");
  const [isShortMovies, setIsShortMovies] = React.useState(JSON.parse(localStorage.getItem("isShortMovies")) || false);
  const [isShortSavedMovies, setIsShortSavedMovies] = React.useState(JSON.parse(localStorage.getItem("isShortSavedMovies")) || false);
  const [moviesForShow, setMoviesForShow] = React.useState([]);
  // const [isShortMovies, setIsShortMovies] = React.useState(JSON.parse(localStorage.getItem("isShortMovies")) || false);
  // const [isShortSavedMovies, setIsShortSavedMovies] = React.useState(false); //переписать и обойтись без него
  // отфильтрованные короткометражки на странице с фильмами
  // const [shortFilteredMovies, setShortFilteredMovies] = React.useState(JSON.parse(localStorage.getItem("shortFilteredMovies")) || []);
  // отфильтрованные короткометражки на странице с сохраненными фильмами
  // const [shortFilteredSavedMovies, setShortFilteredSavedMovies] = React.useState(JSON.parse(localStorage.getItem("shortFilteredSavedMovies")) || []);
  const [isOpenConfirmationPopup, setIsOpenConfirmationPopup] = useState(false);

  //получение значения от кастомного хука
  const { isWideScreen } = useResize();
  const navigate = useNavigate();
  const path = useLocation();

  // useEffect(() => {
  //   localStorage.setItem("isShortMovies", JSON.stringify(isShortMovies))
  // }, [isShortMovies])

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
        //зарегистрированному пользователю в инпутах форм 
        //будут показаны его данные
      })
      .catch((err) => {
        // если кука истекла, удалить все данные как при разлогировании
        setIsLoggedIn(false);
        setCurrentUser({
          name: "",
          email: "",
        });
        localStorage.removeItem("isShortMovies");
        localStorage.removeItem("movies");
        localStorage.removeItem("savedMovies");
        localStorage.removeItem("moviesSearchQuery");
        localStorage.removeItem("shortFilteredSavedMovies");
        localStorage.removeItem("shortFilteredMovies");
        localStorage.removeItem("isShortMovies");
        localStorage.removeItem("savedMoviesSearchQuery");
        localStorage.removeItem("currentUser");
        // localStorage.removeItem("savedFilteredMovies");
        localStorage.removeItem("basicMovies");
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

  //скрыть попап с уведомлением по таймеру
  useEffect(() => {
    if (isOpenConfirmationPopup) {
      setTimeout(() => {
        setIsOpenConfirmationPopup(false)
      }, 1000);
    }
  }, [isOpenConfirmationPopup]);

 
  

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
        setCurrentUser(res);
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
    auth
      .updateUser({ name, email })
      .then((res) => {
        setCurrentUser(res)
        openPopup('Данные успешно изменены');
        // уведомление в профиле
      })
      .catch((err) => {
        console.log(err);
        openPopup(err || "");
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
      }))
      .then(() => setIsLoggedIn(false))
      .then(() => {
        //TO DO: проверить лишние
        localStorage.removeItem("isShortMovies");
        localStorage.removeItem("movies");
        localStorage.removeItem("savedMovies");
        localStorage.removeItem("moviesSearchQuery");
        localStorage.removeItem("shortFilteredSavedMovies");
        localStorage.removeItem("shortFilteredMovies");
        localStorage.removeItem("isShortMovies");
        localStorage.removeItem("savedMoviesSearchQuery");
        localStorage.removeItem("currentUser");
        // localStorage.removeItem("savedFilteredMovies");
        localStorage.removeItem("basicMovies");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      });
  };

  //функция сохранения фильма
  function handleSaveMovie(movie) {
    MainApi
      .saveMovie(movie)
      .then((newMovie) => {
        // setMovies((state) => state.map((elem) => elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem));
        // // setShortFilteredMovies((state) => state.map((elem) => elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem));
        // setSavedFilteredMovies((state) => state.map((elem) => elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem));
        // newMovie.buttonLikeType = "delete"
        // setSavedMovies((state) => [...state, newMovie])
        // // setShortFilteredSavedMovies((state) => [...state, newMovie]);
        // //прибавляет новый фильм к массиву имеющихся
        // //обновить в LS этот массив
        // localStorage.setItem("savedMovies", JSON.stringify(savedMovies));

        setMovies((state) => state.map((elem) => {
          return elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem
        }));
        setSavedFilteredMovies((state) => state.map((elem) => elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem));
        newMovie.buttonLikeType = "delete"
        setSavedMovies((state) => [...state, newMovie])
        // setShortFilteredSavedMovies((state) => [...state, newMovie]);
        //прибавляет новый фильм к массиву имеющихся
        //обновить в LS этот массив
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        
      })
      // .then(() => {
      //   localStorage.setItem("movies", JSON.stringify(movies)); //нов не факт что нужно
      // })
      .catch((err) => {
        console.log(err);
      })
  }

  console.log(movies, 'movies')

  // удаление из сохраненных
  function handleDeleteMovie(id) {
    const deleteMovie = savedMovies.find((savedMovie) => savedMovie.movieId === id)
    MainApi
      .deleteCard(deleteMovie._id)
      .then(() => {
        setMovies((state) => state.map((elem) => elem.id === id ? { ...elem, buttonLikeType: "unliked", key: elem.id } : elem))
        setSavedMovies((state) => state.filter((c) => c._id !== deleteMovie._id))
        setSavedFilteredMovies((state) => state.map((elem) => elem.id === id ? { ...elem, buttonLikeType: "unliked", key: elem.id } : elem))
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        // setShortFilteredSavedMovies((state) => state.filter((c) => c._id !== deleteMovie._id));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  ///////////////////////////////////////////////////

  // повторяющаяся функция фильтрации массива по ключевому слову
  function searchFilm(movies, string) {
    return movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(string.toLowerCase())
        || movie.nameEN.toLowerCase().includes(string.toLowerCase())
      )
    })
  }

  // поиск на странице с сохраненными фильмами
  function handleSearchSavedMovie(string) {
    const films = searchFilm(savedMovies, string);
    if (films.length === 0) {
      setSavedFilteredMovies([]); //тут работает! обнуляются сохраненные фильмы до сохраненных фильмов
      openPopup("Ничего не найдено");
    } else {
      setSavedFilteredMovies(films); // || []
    }
    
  }

  //Определить фильмы для отображения 
  useEffect(() => {
    if (path.pathname === "/movies") {
      localStorage.setItem("movies", JSON.stringify(movies)); //нов не факт что нужно
      if (movies.length > 0) {
        setMoviesForShow(isShortMovies ? (
          movies.filter((movie) => {
            return (
              movie.duration <= 40
            )
          })
        ) : movies)
      } else if (movies.length === 0) {
        setMoviesForShow([]);
        // isLoggedIn && openPopup("Ничего не найдено"); //здесь это нельзя размещать из-за проблем при регистрации
      }

    } else {  //записать значение сохраненных или отфильтрованных соханенных

      const films = savedFilteredMovies.length > 0 ? savedFilteredMovies : savedMovies
      if (films.length > 0) {
        setMoviesForShow(isShortSavedMovies ? (
          films.filter((film) => {
            return (
              film.duration <= 40
            )
          })
        ) : films)
        
      } else if (films.length === 0) {
        setMoviesForShow([]);
        // isLoggedIn && openPopup("Ничего не найдено");  //здесь это нельзя размещать из-за проблем при регистрации
      }
    }
  }, [
    path,
    savedFilteredMovies,
    savedMovies,
    movies,
    isShortMovies,
    isShortSavedMovies,
    isLoggedIn
  ]);

  

  // получение списка фильмов от moviesApi, вызывается только при первом поиске
  function getBasicMovies() {
    return moviesApi
      .getMovies()
      .then((cards) => {
        setBasicMovies(cards)
        localStorage.setItem("basicMovies", JSON.stringify({ cards }))
        return cards
      })
  }

  //установление свойства buttonLikeType каждому фильму из базовых для отображения его статуса
  function setLikeStatus(movies) {
    return movies.map((movie) => {
      const savedMovieLike = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id)
      if (savedMovieLike) {
        return {
          ...movie, buttonLikeType: "liked", key: movie.id
        }
      }
      return { ...movie, buttonLikeType: "unliked", key: movie.id }
    })
  }

  //механика поиска для основной функции поиска фильмов
  function searchMovies(movies, string) {
    const setLikeStatusMovies = setLikeStatus(movies);
    const films = searchFilm(setLikeStatusMovies, string);
    if (films.length === 0) {
      openPopup("Ничего не найдено"); //
      setMovies([]);
      localStorage.setItem("movies", JSON.stringify([]));
    } else {
      setMovies(films); // || []
      localStorage.setItem("movies", JSON.stringify(films)); // || []
    }
  }

  // основная функция поиска фильмов
  function handleSearchMovie(string) {
    // если карточек нет, получить
    if (basicMovies.length === 0) {
      setShowPreloader(true);
      getBasicMovies()
        .then((basicMovies) => {
          // отфильтровать по ключевому слову и записать их в localStorage, стейт movies
          searchMovies(basicMovies, string)
        })
        .catch((err) => {
          console.log(err)
          openPopup(err, `Во время запроса произошла ошибка. 
            Возможно, проблема с соединением или сервер недоступен. 
            Подождите немного и попробуйте ещё раз`);
        })
        .finally(() => {
          setShowPreloader(false);
        })
    }
    else {
      // отфильтровать по ключевому слову и записать их в localStorage, стейт movies
      searchMovies(basicMovies, string)
    }
  };

  //тумблер "короткометражки" на странице с сохраненными фильмами
  // useEffect(() => {
  //   if (isShort && savedMovies.length > 0) {
  //     // setShortFilteredSavedMovies(
  //     //   savedMovies.filter((savedmovie) => {
  //     //     return (
  //     //       savedmovie.duration <= 40
  //     //     )
  //     // console.log(1)
  //     //   })
  //     // )
  //   }
  //   else if (isShort && savedMovies.length === 0) {
  //     // setShortFilteredSavedMovies([]);
  //     openPopup("Ничего не найдено");
  //   }
  // }, [isShort, savedMovies]);



  // // тумблер "короткометражки" на странице с фильмами
  // useEffect(() => {
  //   if (isShortMovies && movies.length > 0) {
  //     setShortFilteredMovies(
  //       movies.filter((movie) => {
  //         return (
  //           movie.duration <= 40
  //         )
  //       })
  //     )
  //   }
  //   else if (isShortMovies && movies.length === 0) {
  //     setShortFilteredMovies([]);
  //     openPopup("Ничего не найдено")
  //   }
  // }, [isShortMovies, movies]);




  return (
    <div className="root">
      {tokenChecked &&
        <div className="page">
          <CurrentUserContext.Provider
            value={currentUser || ""}>
            {showPreloader && <Preloader />}
            <Routes>

              <Route
                path="*"
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
                      openPopup={openPopup}
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
                      openPopup={openPopup}
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
                          isMainPage={isMainPage}
                          isWideScreen={isWideScreen}
                        />
                        <main className="content">
                          <Movies
                            isLoggedIn={isLoggedIn}
                            movies={moviesForShow}
                            handleSaveMovie={handleSaveMovie}
                            handleSearchMovie={handleSearchMovie}
                            isShortMovies={isShortMovies}
                            setIsShortMovies={setIsShortMovies}
                            isShortSavedMovies={isShortSavedMovies}
                            setIsShortSavedMovies={setIsShortSavedMovies}
                            handleDeleteMovie={handleDeleteMovie}
                            openPopup={openPopup}
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
                          isMainPage={isMainPage}
                          isWideScreen={isWideScreen}
                        />
                        <main className="content">
                          <SavedMovies
                            isLoggedIn={isLoggedIn}
                            movies={moviesForShow}
                            handleSearchMovie={handleSearchSavedMovie} //отличается от movies
                            openPopup={openPopup}
                            handleDeleteMovie={handleDeleteMovie}
                            isShortMovies={isShortSavedMovies}
                            setIsShortMovies={setIsShortSavedMovies}
                            isShortSavedMovies={isShortSavedMovies}
                            setIsShortSavedMovies={setIsShortSavedMovies}
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
                          isMainPage={isMainPage}
                          isWideScreen={isWideScreen}
                        />
                        <main className="content">
                          <Profile

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

            <RequestMessage //редактирование имени польз
              isOpenConfirmationPopup={isOpenConfirmationPopup}
              requestMessage={requestMessage}
            />

          </CurrentUserContext.Provider>
        </div>
      }
    </div>
  );
}

export default App;
