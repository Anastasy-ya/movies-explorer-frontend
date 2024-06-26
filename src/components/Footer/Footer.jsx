import React from "react";
import './Footer.css';
import { Link } from 'react-router-dom';

const year = new Date().getFullYear();

function Footer(props) {
  return (

    <footer className="footer">
      <div className="footer__size-container size-container">
        <div className="footer__info">
          <p className="footer__text footer__text_type_gray">Educational project BeatFilm.</p>
          <div className="footer__line"></div>
        </div>
        <div className="footer__box">
          <p className="footer__text">© {year}</p>
          <div className="footer__links-box">
            {/* <Link
              to="https://practicum.yandex.ru/"
              className="footer__text"
              aria-label="link to Yandex praktikum"
              target="_blank"
            >Яндекс.Практикум</Link> */}
            <Link
              to="https://github.com/Anastasy-ya"
              className="footer__text"
              aria-label="link to Github"
              target="_blank"
            >Github</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;