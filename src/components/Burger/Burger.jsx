import './Burger.css';

import React from "react";

function Burger({ 
  handleOpenClosePopup
}) {

  return (
    <div
      className="header__burger burger"
      onClick={handleOpenClosePopup}
    >
      <span className="burger__icon"></span>
    </div>
  );
}

export default Burger;
