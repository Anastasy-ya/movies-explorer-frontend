import React from "react";
import './LearnMore.css';

function LearnMore({ moviesToRender, handlerMoreFilms, isRenderedLearnMore }) {

  return (
    <div className="learn-more size-container">
      {isRenderedLearnMore ? 
      // если фильмов нет, то кнопку "еще" не показывать
        <button
          className="learn-more__button"
          aria-label="show more films"
          onClick={handlerMoreFilms}
        >
          Ещё
        </button>
        : <p 
        className={`${moviesToRender > 0 ? "learn-more__message" : "learn-more__none"}`}>
        Ничего не найдено
        </p>
        }

    </div>

  );
}

export default LearnMore;

