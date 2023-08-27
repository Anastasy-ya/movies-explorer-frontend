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

  const { isWideScreen } = useResize(); //получение значения от кастомного хука

  const navigate = useNavigate();

  const path = useLocation();

  // console.log('currentUser:', currentUser, 'isLoggedIn:', isLoggedIn);

  function handleOpenClosePopup() {
    // поменять значение на противоположное
    setIsOpenPopup(!isOpenPopup); 
    document.querySelector(".burger").classList.toggle('open');
    /*после сдачи всех этапов добавить переключатель стиля для запрета прокрутки попапа*/
  };

  function handleRegister({ name, email, password }) {
    setShowPreloader(true);
    auth
      .register({ name, email, password })
      .then((res) => {
        // navigate("/movies", { replace: true });
        //наверное нужно уведомление о удачной решгистрации
      })
      .catch((err) => {
        console.log(err);
        // setUserMessage("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        setShowPreloader(false);
      });
  }

  function handleLogin({ name, email }) {
    setShowPreloader(true);
    auth
    .login({ name, email })
    .then((res) => {
      setIsLoggedIn(true);
      navigate("/movies", { replace: true });
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


  useEffect(() => {
    path.pathname === "/" ?
      setIsMainPage(true) :
      setIsMainPage(false);
  }, [path]);

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
                    setCurrentUser={setCurrentUser}
                    currentUser={currentUser}
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
                    setCurrentUser={setCurrentUser}
                    currentUser={currentUser}
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
                <>
                  <Header
                    isLoggedIn={isLoggedIn}
                    handleOpenClosePopup={handleOpenClosePopup}
                    isOpenPopup={isOpenPopup}
                    isMainPage={isMainPage}
                    isWideScreen={isWideScreen}
                  />
                  {/* <ProtectedRoute
                      isLoggedIn={isLoggedIn}
                      element={Movies}
                    /> */}
                  <main className="content">
                    <Movies
                      isLoggedIn={isLoggedIn}
                    />
                  </main>
                  <Footer />
                </>
              }
            />

            <Route /*не забыть удалить и защитить нужные роуты */
              path="/2"
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
                      <Movies
                        isLoggedIn={isLoggedIn}
                      />
                      <Footer />
                    </>
                  )}
                />
              }
            />

            <Route
              path="/saved-movies"
              element={
                <>
                  <Header
                    isLoggedIn={isLoggedIn}
                    handleOpenClosePopup={handleOpenClosePopup}
                    isOpenPopup={isOpenPopup}
                    isMainPage={isMainPage}
                    isWideScreen={isWideScreen}
                  />
                  {/* <ProtectedRoute
                      isLoggedIn={isLoggedIn}
                      element={SavedMovies}
                    /> */}
                  <main className="content">
                    <SavedMovies
                      isLoggedIn={isLoggedIn}
                    />
                  </main>
                  <Footer />
                </>
              }
            />

            <Route
              path="/profile"
              element={
                <>
                  {/* <ProtectedRoute
                      element={Profile}
                      isLoggedIn={isLoggedIn}
                    /> */}
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
                    />
                  </main>
                </>
              }
            />

          </Routes>

        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
