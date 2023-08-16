import React from "react";
import './Burger.css';

function Burger(props) {

  function handler() {
    document.querySelector(".burger").classList.toggle('open');
    // props.setIsOpenPopup(!props.isOpenPopup);
    // console.log(props.isOpenPopup);
    props.handleOpenClosePopup();
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
