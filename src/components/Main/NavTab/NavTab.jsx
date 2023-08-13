import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <section className="navigation">
      <div className="navigation__size-container size-container ">
        <a
        href="/"
        className="navigation__text" 
        aria-label="navigate to about project info"
        >О проекте</a> {/*тут будут линки */}
        <a
        href="/"
        className="navigation__text" 
        aria-label="navigate to used technologies"
        >Технологии</a>
        <a
        href="/"
        className="navigation__text" 
        aria-label="navigate to info about student"
        >Студент</a>
      </div>
    </section>
  );
}

export default NavTab;