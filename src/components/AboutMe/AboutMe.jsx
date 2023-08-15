import React from 'react';
import './AboutMe.css';

import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
  <>
    <div className="about-me__student">
      <div className="about-me__box">

        <div className="about-me__colunm">
          <h2 className="about-me__name">Виталий</h2>
          <h3 className="about-me__profession">Фронтенд-разработчик, 30 лет</h3>
          <article className="about-me__info">
            Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать
            музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того,
            как прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
          </article>
        </div>

        <a 
          href="/" 
          className="about-me__gihub" 
          aria-label="link to Github"
          target="_blank"
        >Github</a>{/*это будут линки */}
        
      </div>
      <img className="about-me__image" alt="" src="../" />
    </div>

    <Portfolio></Portfolio>
  </>
  );
}

export default AboutMe;