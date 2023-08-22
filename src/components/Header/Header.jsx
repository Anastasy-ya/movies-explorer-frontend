import React, { useState, useEffect } from "react";
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
  handleOpenClosePopup, 
  isWideScreen 
}) {

  
  const [headerView, setHeaderView] = useState(<p></p>);

  useEffect(() => {
    if (!isMainPage && !isWideScreen) {
      setHeaderView(
        <div className="header__info-account">
          <Burger
            // isLoggedIn={isLoggedIn}
            handleOpenClosePopup={handleOpenClosePopup}
            // isOpen={isOpenPopup}
          />
        </div>
      )
    }
    else {
      setHeaderView(
        <>
          {isLoggedIn && !isMainPage && (<nav className="header__navigation-box">

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
            isPopup={false}
          />
        </>
      )
    }
  }, [isWideScreen, isMainPage, isLoggedIn, handleOpenClosePopup]);



  return (
    <header className="header">

      <div className={`header__main ${isMainPage ? "header__main_type_turquoise" : ""}`}>
        <div className="header__size-container size-container">
          <Logo />
          {headerView}
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
