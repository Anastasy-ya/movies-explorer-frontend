import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom"; //, Navigate, useNavigate
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
import { useLocation } from "react-router-dom";
// import * as auth from "../utils/auth";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [showPreloader, setShowPreloader] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const [isMainPage, setIsMainPage] = useState(false);



  const path = useLocation();

  function handleOpenClosePopup() {
    setIsOpenPopup(!isOpenPopup);
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

          <main className="content">

            <Routes>

              <Route
                path="*" //пользователь вошел на несуществующую страницу
                element={<PageNotFound />}
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
                    />
                    <Main
                      isLoggedIn={isLoggedIn}
                    />
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
                    />
                    <ProtectedRoute
                      isLoggedIn={isLoggedIn}
                      element={Movies}
                    />
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
                    />
                    <ProtectedRoute
                      isLoggedIn={isLoggedIn}
                      element={SavedMovies}
                    />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/profile"
                element={
                  <>
                    <Header
                      isLoggedIn={isLoggedIn}
                      handleOpenClosePopup={handleOpenClosePopup}
                      isOpenPopup={isOpenPopup}
                      isMainPage={isMainPage}
                    />
                    <ProtectedRoute
                      element={Profile}
                      isLoggedIn={isLoggedIn}
                    />
                  </>
                }
              />

            </Routes>
            <Popup
              isOpen={isOpenPopup}
              isLoggedIn={isLoggedIn}
            // handleOpenClosePopup={handleOpenClosePopup}
            />

          </main>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
