import React from 'react';
import './Techs.css';

function Techs() {
  return (
      <>
        <h3 className="techs__subtitle" id="techs">7 technologies</h3>
        <p className="techs__text">
          On the course of web development mastered technologies that are applied in the diploma project.
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