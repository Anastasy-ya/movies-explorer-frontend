import React from 'react';
import './Portfolio.css';
import { Link } from 'react-router-dom';

function Portfolio() {
  return (

    <div className="portfolio">

      <h4 className="portfolio__title">Portfolio</h4>

      <div className="portfolio__link">
        <Link
          to="https://github.com/Anastasy-ya/how-to-learn"
          className="portfolio__text"
          aria-label="link to static web site"
          target="_blank"
        >Web-site with static layout</Link>
        <div className="portfolio__icon">↗</div>
      </div>
      <div className="portfolio__link">
        <Link
          to="https://github.com/Anastasy-ya/travel"
          className="portfolio__text"
          aria-label="link to adaptive web site"
          target="_blank"
        >Web-site with adaptive layout</Link>
        <div className="portfolio__icon">↗</div>
      </div>
      <div className="portfolio__link">
        <Link
          to="https://github.com/Anastasy-ya/react-mesto-api-full-gha"
          className="portfolio__text"
          aria-label="link to one-page application"
          target="_blank"
        >Single Page Application</Link>
        <div className="portfolio__icon">↗</div>
      </div>
    </div>

  );
}

export default Portfolio;