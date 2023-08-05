import React from "react";
import './Footer.css';
// не забыть поменять теги на ашки
function Footer() {
  return (
    <footer className="footer">
        <p className="footer__text footer__text_type_gray">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__box">
        <p className="footer__text">© 2020</p>
        <p className="footer__text">Яндекс.Практикум</p>
        <p className="footer__text">Github</p>
      </div>
    </footer>
  );
}

export default Footer;