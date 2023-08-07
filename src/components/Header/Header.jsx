import React from "react";
import './Header.css';
import { Route, Routes } from "react-router-dom";
import logo from "../../images/logo.svg";
import { NavLink } from "react-router-dom";


function Header(props) { // { userEmail, deleteToken }
  return (
    <header className="header header_type_turquoise">
      <div className="size-container header__size-container">
        <img className="header__logo" alt="Логотип" src={logo} />
        
        <nav className="header__navigation-box">
          <p className="header__text header__link-text">Фильмы</p>
          <p className="header__text header__link-text">Сохраненные фильмы</p>
          {/* <Routes>
            <Route
              path="/movies"
              element={
                <NavLink
                  className="header__text header__link-text"
                  to="/movies"
                  onClick={props.deleteToken}
                >
                  Фильмы
                </NavLink>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <NavLink
                  className="header__text header__link-text"
                  to="/saved-movies"
                >
                  Сохраненные фильмы
                </NavLink>
              }
            />
          </Routes> */}
        </nav>

        <div className="header__info-account">
          {/* <p className="header__text">Аккаунт</p>
          <button className="header__account-button"></button> */}
          {/*ниже альтернативный вариант для неавторизованного пользователя */}
          <p className="header__text">Регистрация</p>
          <button className="header__login-button">Войти</button>
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
