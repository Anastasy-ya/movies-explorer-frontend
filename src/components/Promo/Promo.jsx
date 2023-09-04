import React from 'react';
import './Promo.css';
import NavTab from '../NavTab/NavTab';

function Promo() {
  return (
    <section className="banner">

      <div className="banner__image">
        <h1 className="banner__text">Учебный проект студента факультета Веб-разработки.</h1>
      </div>

      <NavTab></NavTab>

    </section>
  );
}

export default Promo;