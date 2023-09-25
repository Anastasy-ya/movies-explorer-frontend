import React from "react";
import './Burger.css';

function Burger({ handleOpenClosePopup }) { //isLoggedIn, isOpen, 

  function handlerClick() {
    handleOpenClosePopup();
  }

  return (
    <div
      className="header__burger burger"
      onClick={handlerClick}
    >
      <span className="burger__icon"></span>
    </div>
  );
}

export default Burger;
