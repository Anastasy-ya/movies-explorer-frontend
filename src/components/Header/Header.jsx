import React, { useState, useEffect } from "react";
import "./Header.css";
// import { Route, Routes } from "react-router-dom";
import logo from "../../images/logo.svg";
import { NavLink, useLocation } from "react-router-dom";
import { useResize } from "../../components/hooks/useResize";
import Burger from "../Burger/Burger"

function Header(props) {
  // пропсы { isLoggedIn,  }

  const [isMainPage, setIsMainPage] = useState(false);
  const path = useLocation();
  const { isWideScreen } = useResize(); //получение значения от кастомного хука
  const isLogged = props.isLoggedIn;
  const [headerView, setHeaderView] = useState(<p></p>);

  useEffect(() => {

    if (isLogged && isWideScreen) {
      setHeaderView(
        <>
          <nav className="header__navigation-box">

            <NavLink
              className={({isActive}) => `header__link ${isActive ? "header__link_active" : ""}`}
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
          <div className="header__info-account">
            <p className="header__authentification">Аккаунт</p>
            <button className="header__account-button"></button>
          </div>
        </>
      )
    } else if (isLogged && !isWideScreen) { //полное меню
      setHeaderView(
        <div className="header__info-account">
          <Burger></Burger>
        </div>
      )
    } else if (!isLogged && isWideScreen) {
      setHeaderView(
        <div className="header__info-account">
          <p
            className="header__authentification"
            aria-label="" //вставлять когда ссылка становится действующей
          >
            Регистрация
          </p>
          <button className="header__login-button" aria-label="login button">
            Войти
          </button>
        </div>
      )
    } else if (!isLogged && !isWideScreen) {  //бургер ведет на регистрацию
      setHeaderView(
        <div className="header__info-account">
          <Burger></Burger>
        </div>
      )
    }
  }, [isLogged, isWideScreen]);


  useEffect(() => {
    path.pathname === "/" ?
      setIsMainPage(true) :
      setIsMainPage(false);
  }, [path]);

  return (

    <header className={`header ${isMainPage ? "header_type_turquoise" : ""}`}>
      <div className="header__size-container size-container">
        <img className="header__logo" alt="Логотип" src={logo} />
        {headerView}



        {/* {props.isLoggedIn && isWideScreen ? (
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
        ) : ("")} */}





      </div>
    </header>



  );
}

export default Header;
