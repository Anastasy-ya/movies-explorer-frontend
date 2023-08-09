import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <section className="navigation">
      <div className="size-container navigation__size-container">
        <h2 className="navigation__text">О проекте</h2> {/*тут будут линки */}
        <h2 className="navigation__text">Технологии</h2>
        <h2 className="navigation__text">Студент</h2>
      </div>
    </section>
  );
}

export default NavTab;