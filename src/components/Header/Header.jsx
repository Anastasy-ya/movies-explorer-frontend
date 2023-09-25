import React, { useState, useEffect, useCallback } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import Burger from "../Burger/Burger";
import InfoAccount from "../InfoAccount/InfoAccount";
import Logo from "../Logo/Logo";
import Popup from "../Popup/Popup";

function Header({
  isLoggedIn,
  isMainPage,
  isOpenPopup,
  setIsOpenPopup,
  // handleOpenClosePopup,
  isWideScreen,

}) {

  //функция открытия/закрытия попапа
  function handleOpenClosePopup() {
    // поменять значение на противоположное
    setIsOpenPopup(!isOpenPopup);
    console.log(document.querySelector(".burger"));
    document.querySelector(".burger").classList.toggle('burger_opened');
    /*TODO: после сдачи всех этапов добавить переключатель стиля для запрета прокрутки попапа*/
    //и найти пропавшую анимацию
  }

  return (
    <header className="header">

      <div className={`header__main ${isMainPage ? "header__main_type_turquoise" : ""}`}>
        <div className="header__size-container size-container">
          <Logo />
          {!isMainPage && !isWideScreen ?
            <div className="header__info-account">
              <Burger
                handleOpenClosePopup={handleOpenClosePopup}
              />
            </div> :
            <>
              {isLoggedIn && (<nav className="header__navigation-box"> {/*isWideScreen &&  */}

                <NavLink
                  className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}
                  aria-label="link to films"
                  to="/movies"
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

              </nav>)}

              <InfoAccount
                isLoggedIn={isLoggedIn}
                isPopup={false} // стили для попапа
              />
            </>
          }
        </div>
      </div>

      <Popup
        isOpen={isOpenPopup}
        isLoggedIn={isLoggedIn}
        handleOpenClosePopup={handleOpenClosePopup}
      />

    </header>
  );
}

export default Header;
