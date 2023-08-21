import React, { useState, useEffect } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useResize } from "../../components/hooks/useResize";
import Burger from "../Burger/Burger";
import InfoAccount from "../InfoAccount/InfoAccount";
import Logo from "../Logo/Logo";

function Header({ isLoggedIn, isMainPage, isOpenPopup, handleOpenClosePopup }) {

  const { isWideScreen } = useResize(); //получение значения от кастомного хука
  const [headerView, setHeaderView] = useState(<p></p>);

  // useEffect(() => {
  //   isWideScreen ? (
  //     setHeaderView(
  //       <>
  //         {props.isLoggedIn && (<nav className="header__navigation-box">

  //           <NavLink
  //             className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}
  //             aria-label="link to films"
  //             to="/movies"
  //           >
  //             Фильмы
  //           </NavLink>

  //           <NavLink
  //             className="header__link"
  //             aria-label="link to saved films"
  //             to="/saved-movies"
  //           >
  //             Сохраненные фильмы
  //           </NavLink>

  //         </nav>)}

  //         <InfoAccount
  //           isLoggedIn={props.isLoggedIn}
  //         />
  //       </>
  //     )
  //   ) : (
  //     setHeaderView(
  //       <div className="header__info-account">
  //         <Burger
  //           isLoggedIn={props.isLoggedIn}
  //           handleOpenClosePopup={props.handleOpenClosePopup}
  //         />
  //       </div>
  //     )
  //   )
  // }, [props.isLoggedIn, isWideScreen, props.isOpenPopup]);

  useEffect(() => {
    if (!isMainPage && !isWideScreen) {
      setHeaderView(
        <div className="header__info-account">
          <Burger
            isLoggedIn={isLoggedIn}
            handleOpenClosePopup={handleOpenClosePopup}
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
    </header>
  );
}

export default Header;
