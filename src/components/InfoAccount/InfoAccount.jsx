import React from "react";
import './InfoAccount.css';
// import { NavLink, useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';

function InfoAccount({ isLoggedIn, isPopup }) {

  return (
    <>
      {isLoggedIn ? (

        <Link
          to="/profile"
          reloadDocument
          aria-label="navigate to profile data"
        >
          <div className="info-account info-account_type_account">
            <p className={`info-account__authentification ${isPopup && "info-account__authentification_type_popup"}`}>Аккаунт</p>
            <button className="info-account__account-button"
              aria-label="profile"
            ></button>
          </div>
        </Link>

      ) : (
        <div className="info-account">

          <Link
            to="/signup"
            reloadDocument
            aria-label="navigate to signin"
          >
            <button
              className="info-account__registration"
              aria-label="signin"
            >
              Регистрация
            </button>
          </Link>

          <Link
            to="/signin"
            reloadDocument
            className="info-account__login-button" /*navigation__text*/
            aria-label="login button"
          >Войти
          </Link>

        </div>
      )
      }
    </>
  );
}

export default InfoAccount;