import React from "react";
import './Popup.css';
import usePopupClose from "../hooks/usePopupClose";
import { NavLink } from "react-router-dom";
import InfoAccount from "../InfoAccount/InfoAccount";

function Popup({ isOpen, isLoggedIn, handleOpenClosePopup }) {

  usePopupClose({ isOpen, handleOpenClosePopup });

  return (
    <>
      <div
        className={`popup ${isOpen ? "popup_opened" : ""
          }`}
      >
        <div className="popup__container">

          {isLoggedIn ? (
            <div className="popup__links">
              <NavLink
                className={({ isActive }) => `popup__link ${isActive ? "popup__link_active" : ""}`}
                aria-label="link to main page"
                to="/"
                onClick={handleOpenClosePopup}
              >
                Main
              </NavLink>
              <NavLink
                className={({ isActive }) => `popup__link ${isActive ? "popup__link_active" : ""}`}
                aria-label="link to main page"
                to="/movies"
                onClick={handleOpenClosePopup}
              >
                Movies
              </NavLink>
              <NavLink
                className={({ isActive }) => `popup__link ${isActive ? "popup__link_active" : ""}`}
                aria-label="link to main page"
                to="/saved-movies"
                onClick={handleOpenClosePopup}
              >
                Saved movies
              </NavLink>
            </div>
          ) : (
            <></> // links for unregistered user to add in the future
          )}
          <InfoAccount
            isLoggedIn={isLoggedIn}
            isPopup={true}
          />
        </div>
      </div>
    </>
  );
}

export default Popup;