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
import { useResize } from "../../components/hooks/useResize";
import { useLocation } from "react-router-dom";
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
  });

  // Basic films obtained from the server should not be changed!
  const [basicMovies, setBasicMovies] = React.useState([]);
  // filtered basic movies
  const [movies, setMovies] = React.useState(JSON.parse(localStorage.getItem("movies")) || []);
  // saved movies, updated when liked
  const [savedMovies, setSavedMovies] = React.useState(JSON.parse(localStorage.getItem("savedMovies")) || []);
  // result of searching in saved movies
  const [savedFilteredMovies, setSavedFilteredMovies] = React.useState([]);
  // error messages
  const [requestMessage, setRequestMessage] = React.useState("");
  const [isShortMovies, setIsShortMovies] = React.useState(JSON.parse(localStorage.getItem("isShortMovies")) || false);
  const [isShortSavedMovies, setIsShortSavedMovies] = React.useState(JSON.parse(localStorage.getItem("isShortSavedMovies")) || false);
  const [moviesForShow, setMoviesForShow] = React.useState([]);
  const [isOpenConfirmationPopup, setIsOpenConfirmationPopup] = useState(false);

  // custom hook value
  const { isWideScreen } = useResize();
  const navigate = useNavigate();
  const path = useLocation();

  function openPopup(string) {
    setRequestMessage(string);
    setIsOpenConfirmationPopup(true);
  }

  // getting saved movies from the database
  useEffect(() => {
    if (isLoggedIn) {
      MainApi
        .getInitialMovies()
        .then((films) => {
          const deleteIconMovies = films.map((film) => {
            return {
              ...film, buttonLikeType: "delete", key: film._id
              // additional property for assigning type: delete to filtering by it
            }
          })
          setSavedMovies(deleteIconMovies);
          localStorage.setItem("savedMovies", JSON.stringify(deleteIconMovies))
        })
        .catch(console.error)
    }
  }, [isLoggedIn])

  // checking of user registration
  // registered one sees his dates in inputs
  useEffect(() => {
    auth
      .checkToken()
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setCurrentUser({
          name: "",
          email: "",
        });
        localStorage.removeItem("isShortMovies");
        localStorage.removeItem("movies");
        localStorage.removeItem("savedMovies");
        localStorage.removeItem("moviesSearchQuery");
        localStorage.removeItem("isShortSavedMovies");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("basicMovies");
        console.log(err);
      })
      .finally(() => {
        setTokenChecked(true);
      });
  }, []);

  // hide popup with message by timer
  useEffect(() => {
    if (isOpenConfirmationPopup) {
      setTimeout(() => {
        setIsOpenConfirmationPopup(false)
      }, 1000);
    }
  }, [isOpenConfirmationPopup]);

  // registering
  function handleRegister({ name, email, password }) {
    return auth
      .register({ name, email, password })
      .then((res) => {
        handleLogin({ email, password })
      })
  };

  // authorization
  function handleLogin({ email, password }) {
    return auth
      .login({ email, password })
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
      })
      .then(() => {
        navigate("/movies", { replace: true });
        //navigation after authorization because the authorization function is asynchronous
        // and if the user gets to the site before authorization occurs,
        // he will be redirected to the main page again
      })
  }

  // change curent user's data
  function handleChangeProfile({ name, email }) {
    auth
      .updateUser({ name, email })
      .then((res) => {
        setCurrentUser(res)
        openPopup('Data changed successfully');
      })
      .catch((err) => {
        console.log(err);
        openPopup(err || "");
      })
      .finally(() => {
      });
  }

  // logout
  function handleDeleteToken() {
    auth.logOut()
      .then(() => setCurrentUser({
        name: "",
        email: "",
      }))
      .then(() => setIsLoggedIn(false))
      .then(() => {
        localStorage.removeItem("isShortMovies");
        localStorage.removeItem("isShortSavedMovies");
        localStorage.removeItem("movies");
        localStorage.removeItem("savedMovies");
        localStorage.removeItem("moviesSearchQuery");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("basicMovies");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      });
  };

  // saving movie
  function handleSaveMovie(movie) {
    MainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setMovies((state) => state.map((elem) => {
          return elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem
        }));
        setSavedFilteredMovies((state) => state.map((elem) => {
          console.log();
          return elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem
        }));
        newMovie.buttonLikeType = "delete"
        setSavedMovies((state) => [...state, newMovie])
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // removing from saved movies
  function handleDeleteMovie(id) {
    const deletedMovie = savedMovies.find((savedMovie) => savedMovie.movieId === id)
    MainApi
      .deleteCard(deletedMovie._id)
      .then(() => {
        setMovies((state) => state.map((elem) => elem.id === id ? { ...elem, buttonLikeType: "unliked", key: elem.id } : elem))
        setSavedMovies((state) => state.filter((c) => c._id !== deletedMovie._id))
        setSavedFilteredMovies((state) => {
          return state.filter((movie) => movie.movieId !== id)
        })
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // filtering an array by a key word, used in several places
  function searchFilm(movies, string) {
    return movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(string.toLowerCase())
        || movie.nameEN.toLowerCase().includes(string.toLowerCase())
      )
    })
  }

  // search on the page with saved movies
  function handleSearchSavedMovie(string, e) {
    e.preventDefault();
    const films = searchFilm(savedMovies, string);
    if (films.length === 0) {
      setSavedFilteredMovies([]);
      openPopup("Nothing found!");
    } else {
      setSavedFilteredMovies(films);
    }
  }

  // define movies to display 
  useEffect(() => {
    if (path.pathname === "/movies") { // on movies page
      localStorage.setItem("movies", JSON.stringify(movies));
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
      }
    } else { // on saved movies page
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

  // getting a list of movies from the moviesApi, called only when searching for the first time
  function getBasicMovies() {
    return moviesApi
      .getMovies()
      .then((cards) => {
        setBasicMovies(cards)
        localStorage.setItem("basicMovies", JSON.stringify({ cards }))
        return cards
      })
  }

  // setting the buttonLikeType property for each basic film to display it's status
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

  // search for the main movie search function
  function searchMovies(movies, string) {
    const setLikeStatusMovies = setLikeStatus(movies);
    const films = searchFilm(setLikeStatusMovies, string);
    if (films.length === 0) {
      openPopup("Nothing found!");
      setMovies([]);
      localStorage.setItem("movies", JSON.stringify([]));
    } else {
      setMovies(films);
      localStorage.setItem("movies", JSON.stringify(films));
    }
  }

  // main movie search function
  function handleSearchMovie(string, e) {
    e.preventDefault();
    // get movies if there isn't 
    if (basicMovies.length === 0) {
      setShowPreloader(true);
      getBasicMovies()
        .then((basicMovies) => {
          searchMovies(basicMovies, string)
        })
        .catch((err) => {
          console.log(err)
          openPopup(err, `An error occurred during the request.
          Maybe there is a connection problem or the server is unavailable.
          Wait a little and try again.`);
        })
        .finally(() => {
          setShowPreloader(false);
        })
    }
    else {
      searchMovies(basicMovies, string)
    }
  };

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
                      buttonText={"Register"}
                      wellcomeText={"Wellcome!"}
                      askToChangeForm={"Already registered? "}
                      askToChangeFormLink={"Login"}
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
                      buttonText={"Login"}
                      wellcomeText={"Wellcome!"}
                      askToChangeForm={"Not registered yet? "}
                      askToChangeFormLink={"Register"}
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
                          isWideScreen={isWideScreen}
                        />
                        <main className="content">
                          <SavedMovies
                            isLoggedIn={isLoggedIn}
                            movies={moviesForShow}
                            handleSearchMovie={handleSearchSavedMovie} // different from movies
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

            <RequestMessage
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
