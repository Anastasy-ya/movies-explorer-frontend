import React from "react";
import './InfoAccount.css';
import { Link } from 'react-router-dom';

function InfoAccount({ isLoggedIn, isPopup }) {

  return (
    <>
      {isLoggedIn ? (

        <Link
          to="/profile"
          reloadDocument
          aria-label="navigate to profile data"
          className="header__info-account"
        >
          <div className="info-account info-account_type_account">
            <p className={`info-account__authentification ${isPopup &&
              "info-account__authentification_type_popup"}`}>Account</p>
            <div className="info-account__account-button"
              aria-label="profile"
            ></div>
          </div>
        </Link>

      ) : (
        <div className="header__info-account info-account">

          <Link
            to="/signup"
            reloadDocument
            aria-label="navigate to signin"
          >
            <div
              className="info-account__registration"
              aria-label="signin"
            >
              Registration
            </div>
          </Link>

          <Link
            to="/signin"
            reloadDocument
            className="info-account__login-button"
            aria-label="login button"
          >Sign In
          </Link>

        </div>
      )
      }
    </>
  );
}

export default InfoAccount;