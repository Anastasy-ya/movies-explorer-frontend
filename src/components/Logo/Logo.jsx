import React from "react";
import './Logo.css';
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      reloadDocument
      aria-label="navigate to about project info"
    >
      <div className="logo">
      </div>
    </Link>

  );
}

export default Logo;