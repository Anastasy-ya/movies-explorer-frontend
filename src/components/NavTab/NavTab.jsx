import React from 'react';
import './NavTab.css';
import { Link } from 'react-router-dom';

function NavTab() {
  return (
    <section className="navigation">
      <div className="navigation__size-container size-container ">
      
        <Link
          to="#about-project"
          reloadDocument
          className="navigation__text"
          aria-label="navigate to about project info"
        >О проекте</Link>

        <Link
          to="#techs"
          reloadDocument
          className="navigation__text"
          aria-label="navigate to used technologies"
        >Технологии</Link>

        <Link
          to="#about-me"
          reloadDocument
          className="navigation__text"
          aria-label="navigate to info about student"
        >Студент</Link>

      </div>
    </section>
  );
}

export default NavTab;