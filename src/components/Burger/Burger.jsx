import React from "react";
import './Burger.css';

function Burger({ handleOpenClosePopup }) { //isLoggedIn, isOpen, 

  function handler() {
    handleOpenClosePopup();
  }

  return (
    <div
      className="header__burger burger"
      onClick={handler}>
      <span className="burger__icon"></span>
    </div>
  );
}

export default Burger;
