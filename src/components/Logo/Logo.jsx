import React from "react";
import './Logo.css';
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="#about-project"
      reloadDocument
      aria-label="navigate to about project info"
    >
      <div className="header__logo" alt="Логотип" >
      </div>
    </Link>

  );
}

export default Logo;