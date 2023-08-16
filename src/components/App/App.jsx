import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Popup from "../Popup/Popup";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";

import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { NavLink, useLocation, Link } from "react-router-dom";
// import * as auth from "../utils/auth";





function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const [isSignInOrSignOut, setIsSignInOrSignOut] = useState(false);
  const [isMainPage, setIsMainPage] = useState(false);
  

  const path = useLocation();

  function handleOpenClosePopup() {
  //   console.log(isOpenPopup);
  //   //   setIsOpenPopup(false) :
      setIsOpenPopup(!isOpenPopup);
  //     console.log(isOpenPopup);
  };



  useEffect(() => {
    path.pathname === "/" ?
      setIsMainPage(true) :
      setIsMainPage(false);
    path.pathname === "/signin" ||
      path.pathname === "/signup" ?
      setIsSignInOrSignOut(true) :
      setIsSignInOrSignOut(false)
  }, [path]);



  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser || ""}>

          <Header
            isLoggedIn={isLoggedIn}
            handleOpenClosePopup={handleOpenClosePopup}
            isOpenPopup={isOpenPopup}
            // setIsOpenPopup={setIsOpenPopup}
            isMainPage={isMainPage}
            isSignInOrSignOut={isSignInOrSignOut}
          />

          <main className="content">

            <Routes>

              <Route
                path="*" //пользователь вошел на несуществующую страницу
                element={<PageNotFound/>}
              />

              <Route
                path="/signup"
                element={
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
                }
              />

              <Route
                path="/signin"
                element={
                  <Login
                    // onSubmit={handleLogin}
                    // isLoading={isLoading}
                  />
                }
              />

              <Route
                path="/"
                element={
                  <Main
                    isLoggedIn={isLoggedIn}
                  />
                }
              /> {/*конец роута / */}

              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    element={Movies}
                  />
                }
              /> {/*конец роута "/movies" */}

              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    element={SavedMovies}
                  />
                }
              /> {/*конец роута "/saved-movies" */}

              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={Profile}
                    isLoggedIn={isLoggedIn}
                  />
                }
              /> {/*конец роута "/profile" */}

            </Routes>
            <Popup
              isOpen={isOpenPopup}
              isLoggedIn={isLoggedIn}
              // handleOpenClosePopup={handleOpenClosePopup}
            />

          </main>
          <Footer isSignInOrSignOut={isSignInOrSignOut}/>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
