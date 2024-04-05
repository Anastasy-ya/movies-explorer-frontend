import React, { useState, useEffect } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import Burger from "../Burger/Burger";
import InfoAccount from "../InfoAccount/InfoAccount";
import Logo from "../Logo/Logo";
import Popup from "../Popup/Popup";
import { useLocation } from "react-router-dom";

function Header({
  isLoggedIn,
  isWideScreen,
}) {

  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const [isMainPage, setIsMainPage] = useState(false);
  const path = useLocation();

  useEffect(() => {
    path.pathname === "/" ?
      setIsMainPage(true) :
      setIsMainPage(false);
  }, [path]);

  function handleOpenClosePopup() {

    // change the value to the opposite
    setIsOpenPopup(!isOpenPopup);

    document.querySelector(".burger").classList.toggle("burger_opened");

    // fix background
    if (!isOpenPopup) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      // default value
      document.body.style.width = 'auto';
    }
  };

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
            </div>
            :
            <>
              {isLoggedIn && (<nav className="header__navigation-box">

                <NavLink
                  className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}
                  aria-label="link to films"
                  to="/movies"
                >
                  Movies
                </NavLink>

                <NavLink
                  className="header__link"
                  aria-label="link to saved films"
                  to="/saved-movies"
                >
                  Saved movies
                </NavLink>

              </nav>)}

              <InfoAccount
                isLoggedIn={isLoggedIn}
                isPopup={false}
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
