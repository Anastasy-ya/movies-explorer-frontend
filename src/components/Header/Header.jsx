import React, { useState, useEffect } from "react";
import "./Header.css";
// import { Route, Routes } from "react-router-dom";
import logo from "../../images/logo.svg";
import { NavLink, useLocation } from "react-router-dom";

function Header(props) {
  // { isLoggedIn,  }

  const [isMainPage, setIsMainPage] = useState(false);
  const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth); //наверное стоит перенести в app

  const path = useLocation();

  useEffect(() => {
    if (path.pathname === "/") {
      setIsMainPage(true);
    }
    setIsMainPage(false);
  }, [path]);

  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(document.documentElement.clientWidth));
    console.log(document.documentElement.clientWidth);
    // window.removeEventListener("resize", () => setWindowWidth(document.documentElement.clientWidth));
  }, [windowWidth]);
  
    
  

  

  return (
    <header className={`header ${isMainPage ? "header_type_turquoise" : ""}`}>
      <div className="header__size-container size-container">
        <img className="header__logo" alt="Логотип" src={logo} />
        
        {props.isLoggedIn && 
        // если пользователь зарегистрирован и ширина экрана юольше 720, то показать навигацию
          windowWidth > 720 ? (
              <nav className="header__navigation-box">
              <NavLink
                className="header__link"
                aria-label="link to films"
                to="/movies"
                // onClick={props.deleteToken}
              >
                Фильмы
              </NavLink>

              <NavLink
                className="header__link"
                aria-label="link to saved films"
                to="/saved-movies"
              >
                Сохраненные фильмы
              </NavLink>
            </nav>
            ) : ("")
          }
        
        

        <div className="header__info-account">
          {/* <p className="header__text">Аккаунт</p>
          <button className="header__account-button"></button> */}
          {/*ниже альтернативный вариант для неавторизованного пользователя */}
          <p
            className="header__authentification"
            aria-label="" //вставлять когда ссылка становится действующей
          >
            Регистрация
          </p>
          <button className="header__login-button" aria-label="login button">
            Войти
          </button>

          {/* <Routes>
            <Route
              path="/profile"
              element={
                <NavLink
                  className="header__text header__link-text"
                  to="/profile"
                  onClick={props.deleteToken}
                >
                  Аккаунт
                </NavLink>
              }
            />
            <Route
              path="/sign-up"
              element={
                <NavLink
                  className="header__text header__link-text"
                  to="/sign-in"
                >
                  Войти
                </NavLink>
              }
            />
          </Routes> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
