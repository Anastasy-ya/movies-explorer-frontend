import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <>
      <ul className="about-project__container" id="about-project">

        <li className="about-project__column">
          <h3 className="about-project__subtitle">Included 5 stages</h3>
          <p className="about-project__text">
            Planning, working on the backend, then on layout, adding functionality and final improvements.
          </p>
        </li>

        <li className="about-project__column">
          <h3 className="about-project__subtitle">It took 5 weeks to develop</h3>
          <p className="about-project__text">
            Each stage had a soft and hard deadline for successful defense.
          </p>
        </li>

      </ul>

      <div className="about-project__infographic infographic">
        <p className="
          infographic__text
          infographic__text_type_black 
          infographic__text_type_green-background
        ">1 week</p>
        <p className="
          infographic__text 
          infographic__text_type_grey-background
        ">4 weeks</p>
        <p className="
          infographic__text 
          infographic__text_type_grey
          infographic__text_type_weight500 
        ">Back-end</p>
        <p className="
          infographic__text 
          infographic__text_type_grey
          infographic__text_type_weight500 
        ">Front-end</p>
      </div>
    </>

  );
}

export default AboutProject;

