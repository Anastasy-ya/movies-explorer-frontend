import React from 'react';
import './AboutMe.css';
import { Link } from 'react-router-dom';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
  <>
    <div className="about-me__student" id = "about-me">
      <div className="about-me__box">

        <div className="about-me__colunm">
          <h2 className="about-me__name">Анастасия</h2>
          <h3 className="about-me__profession">Веб-разработчик, 35 лет</h3>
          <article className="about-me__info">
            Привет. Здесь будет текст обо мне.
          </article>
        </div>

        <Link 
          to="https://github.com/Anastasy-ya" 
          className="about-me__gihub" 
          aria-label="link to Github"
          target="_blank"
        >Github</Link>{/*это будут линки */}
        
      </div>
      <div className="about-me__image" alt="my photo">
      </div>
    </div>

    <Portfolio></Portfolio>
  </>
  );
}

export default AboutMe;