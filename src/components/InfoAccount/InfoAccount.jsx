import React from "react";
import './InfoAccount.css';
import { NavLink, useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';

function InfoAccount(props) {

  return (
    <>
      {props.isLoggedIn ? (
        <div className="info-account info-account_type_login">
          <p className="info-account__authentification">Аккаунт</p>
          <Link
            to="/profile"
            reloadDocument

            aria-label="navigate to profile data"
          >
          <button className="info-account__account-button"
            aria-label=""
          ></button>
          </Link>
          {/* <NavLink
            className="header__link"
            aria-label="link to saved films"
            to="/saved-movies"
          >
          </NavLink> */}
        </div>
      ) : (
        <div className="info-account info-account_type_logout">
        <Link
            to="/signup"
            reloadDocument
            aria-label="navigate to signin"
          >
          <button
            className="info-account__authentification"
            aria-label=""
          >
            Регистрация
          </button>
          </Link>
          <Link
            to="/signin"
            reloadDocument
            className="navigation__text"
            aria-label="navigate to about project info"
          >
            <button
              className="info-account__login-button"
              aria-label="login button">
              Войти
            </button>
          </Link>


        </div>
      )
      }
    </>
  );
}

export default InfoAccount;