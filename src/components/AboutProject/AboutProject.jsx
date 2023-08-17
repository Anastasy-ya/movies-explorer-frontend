import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <>
      <ul className="about-project__container" id="about-project">

        <li className="about-project__column">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>

        <li className="about-project__column">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>

      </ul>

      <div className="about-project__infographic infographic">
        <p className="
          infographic__text
          infographic__text_type_black 
          infographic__text_type_green-background
        ">1 неделя</p>
        <p className="
          infographic__text 
          infographic__text_type_grey-background
        ">4 недели</p>
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

