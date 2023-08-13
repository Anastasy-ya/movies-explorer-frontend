import React from "react";
import './Footer.css';
// не забыть поменять теги на ашки
const year = new Date().getFullYear();

function Footer() {// заменить теги на заголовки текста
  return (
    <footer className="footer">
      <div className="size-container footer__size-container">
        <p className="footer__text footer__text_type_gray">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__line"></div>
        <div className="footer__box">
          <p className="footer__text">© {year}</p>
          <div className="footer__box">
            <a 
            href="/" 
            className="footer__text" 
            aria-label="link to Yandex praktikum"
            target="_blank"
            >Яндекс.Практикум</a>
            {/* это будет линк */}
            <a 
            href="/" 
            className="footer__text" 
            aria-label="link to Github"
            target="_blank"
            >Github</a> 
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;