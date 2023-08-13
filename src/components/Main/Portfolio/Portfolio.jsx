import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (


    <div className="portfolio">

      <h4 className="portfolio__title">Портфолио</h4>

      <div className="portfolio__link">
        <a 
        href="/" 
        className="portfolio__text"
        aria-label="link to static web site"
        target="_blank"
        >Статичный сайт</a> {/*это будут линки */}
        <div className="portfolio__icon">↗</div>
      </div>
      <div className="portfolio__link">
        <a 
        href="/" 
        className="portfolio__text"
        aria-label="link to adaptive web site"
        target="_blank"
        >Адаптивный сайт</a>
        <div className="portfolio__icon">↗</div>
      </div>
      <div className="portfolio__link">
        <a 
        href="/" 
        className="portfolio__text"
        aria-label="link to one-page application"
        target="_blank"
        >Одностраничное приложение</a>
        <div className="portfolio__icon">↗</div>
      </div>
    </div>

  );
}

export default Portfolio;