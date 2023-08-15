import React from 'react';
import './Techs.css';

function Techs() {
  return (
      <>
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <div className="techs__list">
          <p className="techs__text techs__box">HTML</p>
          <p className="techs__text techs__box">CSS</p>
          <p className="techs__text techs__box">JS</p>
          <p className="techs__text techs__box">React</p>
          <p className="techs__text techs__box">Git</p>
          <p className="techs__text techs__box">Express.js</p>
          <p className="techs__text techs__box">mongoDB</p>
        </div>
      </>
  );
}

export default Techs;