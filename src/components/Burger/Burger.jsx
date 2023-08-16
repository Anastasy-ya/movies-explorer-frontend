import React from "react";
import './Burger.css';
import { Link } from 'react-router-dom';

function Burger() {// заменить теги на заголовки текста

  function handler() {
    document.querySelector(".burger").classList.toggle('open');
  }

  // console.log(document.querySelector(".burger"));

  return (
    <div 
      className="header__burger burger" 
      onClick={handler}>
        <span className="burger__icon"></span>
    </div>
  );
}

export default Burger;