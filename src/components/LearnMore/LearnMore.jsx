import React from "react";
import './LearnMore.css';

function LearnMore({ 
  moviesToRender, 
  handlerMoreFilms, 
  isRenderedLearnMore,
  movies
}) {
  // console.log(moviesToRender, 'moviesToRender', movies, 'movies', moviesToRender <= 0 && movies.length === 0)
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
        className={`${movies.length === 0 ? "learn-more__message" : "learn-more__none"}`}>
        Ничего не найдено
        </p>
        }

    </div>

  );
}

export default LearnMore;

