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
  // isMainPage,
  isWideScreen,
}) {

  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const [isMainPage, setIsMainPage] = useState(false);

  const path = useLocation();
  
  //проверка главная ли страница для функции отображения хэдера
  useEffect(() => {
    path.pathname === "/" ?
      setIsMainPage(true) :
      setIsMainPage(false);
  }, [path]);

  //функция открытия/закрытия попапа
  function handleOpenClosePopup() {

    // поменять значение на противоположное
    setIsOpenPopup(!isOpenPopup);

    // изменить стили бургера
    document.querySelector(".burger").classList.toggle("burger_opened");

    // зафиксировать фон
    if (!isOpenPopup) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      // document.body.style.top = `-${window.scrollY}px`; // для фиксации прокрутки окна
    } else {
      document.body.style.position = '';
      //значение по умолчанию
      document.body.style.width = 'auto';
      // const scrollY = document.body.style.top; // для фиксации прокрутки окна
      // document.body.style.top = '';
      // window.scrollTo(0, parseInt(scrollY || '0') * -1);
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
