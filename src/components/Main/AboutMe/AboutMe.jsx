import React from 'react';
import './AboutMe.css';

import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
  <>
    <div className="about-me__student">
      <div className="about-me__box">

        <div>
          <h2 className="about-me__name">Виталий</h2>
          <h3 className="about-me__profession">Фронтенд-разработчик, 30 лет</h3>
          <article className="about-me__info">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена <br />и дочь. Я люблю слушать
            музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того,
            как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </article>
        </div>

        <a href="/" className="about-me__gihub">Github</a>{/*это будут линки */}
        
      </div>
      <img className="about-me__image" alt="" src="../" />
    </div>

    <Portfolio></Portfolio>
  </>
  );
}

export default AboutMe;