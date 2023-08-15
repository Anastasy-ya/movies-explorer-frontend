import React, { useState, useEffect } from "react";
import "./Header.css";
// import { Route, Routes } from "react-router-dom";
import logo from "../../images/logo.svg";
import { NavLink, useLocation } from "react-router-dom";
import { useResize } from "../../components/hooks/useResize";

function Header(props) {
  // пропсы { isLoggedIn,  }

  const [isMainPage, setIsMainPage] = useState(false);

  const path = useLocation();

  const { isWideScreen } = useResize();

  const isLogged = props.isLoggedIn;

  console.log(isWideScreen, isLogged);

// function a(isLogged, isWideScreen) {
//   switch ({ isLogged, isWideScreen }) {
//     case isLogged && isWideScreen:
//       <p>'зарегистрирован и экран широкий'</p>;
//       break;
//     case isLogged && !isWideScreen:
//       <p>'зарегистрирован, экран узкий - бургер'</p>;
//       break;
//     case !isLogged && isWideScreen:
//       <p>'незарегистрирован и экран широкий - предложить войти, меню нет'</p>;
//       break;
//     default:
//       <p>'не зарегистрирован, экран узкий - бургер'</p>;
//   }};

    let headerView;

  switch ({ isLogged, isWideScreen }) {
    case (isLogged && isWideScreen):
      headerView = (<p>'зарегистрирован и экран широкий'</p>);
      break;
    case (isLogged && !isWideScreen):
      headerView = (<p>'зарегистрирован, экран узкий - бургер с доступом к меню'</p>);
      break;
    case (!isLogged && isWideScreen):
      headerView = (<p>'незарегистрирован и экран широкий - предложить войти, меню нет'</p>);
      break;
    case (!isLogged && !isWideScreen):
      headerView = (<p>'не зарегистрирован, экран узкий - бургер'</p>);
      break;
    default:
      console.log('ошибка');
  }

  return (
    
    <header className={`header ${isMainPage ? "header_type_turquoise" : ""}`}>
      <div className="header__size-container size-container">
        <img className="header__logo" alt="Логотип" src={logo} />
        {headerView}
        {/* {(() => { //самовызывающаяся функция
          console.log({ isLogged, isWideScreen })
        switch({ isLogged, isWideScreen }) {
          case (isLogged && isWideScreen):
          return console.log('зарегистрирован и экран широкий')
          
          case isLogged && !isWideScreen:
          return console.log('зарегистрирован, экран узкий - бургер')
          
          case !isLogged && isWideScreen:
          return console.log('незарегистрирован и экран широкий - предложить войти, меню нет')
          
          case !isLogged && !isWideScreen:
          return console.log('не зарегистрирован, экран узкий - бургер')
          
          default:
            console.log('ошибка');
        }
      })()} */}

      



        {/* {
          switch (isLogged, isWideScreen) {
        case isLogged && isWideScreen:
        return <p>'зарегистрирован и экран широкий'</p>
        
        case isLogged && !isWideScreen:
        return <p>'зарегистрирован, экран узкий - бургер'</p>
        
        case !isLogged && isWideScreen:
        return <p>'незарегистрирован и экран широкий - предложить войти, меню нет'</p>
        
        default:
        <p>'не зарегистрирован, экран узкий - бургер'</p>;
  }
        } */}

        {/* { a(isLogged, isWideScreen)} */}

        {props.isLoggedIn && isWideScreen ? (
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
        ) : ("")}



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
        </div>
      </div>
    </header>

          
        
  );
}

export default Header;
