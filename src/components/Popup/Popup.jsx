import React from "react";
import './Popup.css';
// import usePopupClose from "../hooks/usePopupClose";
import { NavLink } from "react-router-dom";
import InfoAccount from "../InfoAccount/InfoAccount";

function Popup({ isOpen, onLoading, isLoggedIn }) {

  // usePopupClose(isOpen); для следующего этапа

  return (
    <>
      <div
        className={`popup ${isOpen ? "popup_opened" : ""
          }`}
      >
        <div className="popup__container">

          {isLoggedIn ? (
            <div className="popup__links">
              <NavLink
                className={({ isActive }) => `popup__link ${isActive ? "popup__link_active" : ""}`}
                aria-label="link to main page"
                to="/"
              >
                Главная
              </NavLink>
              <NavLink
                className={({ isActive }) => `popup__link ${isActive ? "popup__link_active" : ""}`}
                aria-label="link to main page"
                to="/movies"
              >
                Фильмы
              </NavLink>
              <NavLink
                className={({ isActive }) => `popup__link ${isActive ? "popup__link_active" : ""}`}
                aria-label="link to main page"
                to="/saved-movies"
              >
                Сохраненные фильмы
              </NavLink>
            </div>
          ) : (
            <></> //ссылки для незарегистрированного пользователя для добавления в будущем
          )}

          <InfoAccount
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>
    </>
  );
}

export default Popup;