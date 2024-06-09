import React from 'react';
import './NavTab.css';
import { Link } from 'react-router-dom';

function NavTab() {
  return (
    <div className="navigation">
      <div className="navigation__size-container size-container ">
      
        <Link
          to="#about-project"
          reloadDocument
          className="navigation__text"
          aria-label="navigate to about project info"
        >About project</Link>

        <Link
          to="#techs"
          reloadDocument
          className="navigation__text"
          aria-label="navigate to used technologies"
        >Technologies</Link>

        <Link
          to="#about-me"
          reloadDocument
          className="navigation__text"
          aria-label="navigate to info about student"
        >About me</Link>

      </div>
    </div>
  );
}

export default NavTab;