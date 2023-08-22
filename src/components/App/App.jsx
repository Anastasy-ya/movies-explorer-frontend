import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom"; //, Navigate, useNavigate
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
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";
import { useResize } from "../../components/hooks/useResize";
// import * as auth from "../utils/auth";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const [showPreloader, setShowPreloader] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const [isMainPage, setIsMainPage] = useState(false);
  const { isWideScreen } = useResize(); //получение значения от кастомного хука


  const path = useLocation();

  function handleOpenClosePopup() {
    setIsOpenPopup(!isOpenPopup);
    document.querySelector(".burger").classList.toggle('open');
  };

  useEffect(() => {
    path.pathname === "/" ?
      setIsMainPage(true) :
      setIsMainPage(false);
  }, [path]);

  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser || ""}>

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
                    // onSubmit={handleRegister} раскомментировать на 4 этапе
                    // isLoading={isLoading}
                    formName={"signup"}
                    className={"auth-container__form"}
                    buttonText={"Зарегистрироваться"}
                    wellcomeText={"Добро пожаловать!"}
                    askToChangeForm={"Уже зарегистрированы? "}
                    askToChangeFormLink={"Войти"}
                    routTo={"/signin"}
                  />
                </main>
              }
            />

            <Route
              path="/signin"
              element={
                <main className="content">
                  <Login
                    // onSubmit={handleRegister} раскомментировать на 4 этапе
                    // isLoading={isLoading}
                    formName={"signin"}
                    className={"auth-container__form"}
                    buttonText={"Войти"}
                    wellcomeText={"Рады видеть!"}
                    askToChangeForm={"Ещё не зарегистрированы? "}
                    askToChangeFormLink={"Регистрация"}
                    routTo={"/signup"}
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
