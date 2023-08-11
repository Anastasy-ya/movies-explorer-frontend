import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (


    <div className="portfolio">

      <h4 className="text-COLOR-font-3">Портфолио</h4>
      <a href="/" className="text-COLOR-font-main-16">Статичный сайт</a> {/*это будут линки */}
      <div className="text-COLOR-font-main-20">↗</div>
      <a href="/" className="text-COLOR-font-main-16">Адаптивный сайт</a>
      <div className="text-COLOR-font-main-20">↗</div>
      <a href="/" className="text-COLOR-font-main-16">Одностраничное приложение</a>
      <div className="text-COLOR-font-main-20">↗</div>
    </div>

  );
}

export default Portfolio;