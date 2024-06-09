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
            <h2 className="about-me__name">Anastasia</h2>
            <h3 className="about-me__profession">Frontend-developer</h3>

            <article className="about-me__info">
              I&nbsp;am a&nbsp;web developer and senior designer (fullstack designer).
              I&nbsp;enjoy seeing and understanding the development process completely. I&nbsp;understand both areas of&nbsp;design and development more deeply than if&nbsp;I specialized in&nbsp;just one thing.
              Through working with a&nbsp;combined stack, I&nbsp;am able to&nbsp;bring a&nbsp;holistic vision of&nbsp;processes, technical limitations, and possibilities, reduce the number of&nbsp;steps in&nbsp;development, and demonstrate out-of-the-box thinking. I&nbsp;want the entire user experience to&nbsp;create a&nbsp;cohesive view.
              At&nbsp;the moment, I&nbsp;am studying TypeScript using the code-basics trainer and improving my&nbsp;knowledge of&nbsp;the English language.
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