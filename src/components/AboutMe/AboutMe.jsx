import React from 'react';
import './AboutMe.css';
import { Link } from 'react-router-dom';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <>
      <div className="about-me__student" id="about-me">
        <div className="about-me__box">

          <div className="about-me__colunm">
            <h2 className="about-me__name">Анастасия</h2>
            <h3 className="about-me__profession">Веб-разработчик</h3>
            <article className="about-me__info">
              Я - веб разработчик и senior-дизайнер (fullstack дизайнер).
              Мне нравится видеть и понимать процесс разработки полностью. Я понимаю обе сферы и дизайна и разработки глубже, чем если бы специализировалась на чем-то одном.
              Через работу с совмещенным стеком я способна привнести цельное видение процессов, технических ограничений и возможностей, уменьшить количество шагов в разработке, проявить нестандартное мышление. Хочу, чтобы весь пользовательский опыт создавал цельный образ.
              В данный момент изучаю TypeScrypt при помощи тренажера от code-basics и совершенствую знание английского языка.
            </article>
          </div>

          <Link
            to="https://github.com/Anastasy-ya"
            className="about-me__gihub"
            aria-label="link to Github"
            target="_blank"
          >Github</Link>

        </div>
        <div className="about-me__image">
        </div>
      </div>

      <Portfolio></Portfolio>
    </>
  );
}

export default AboutMe;