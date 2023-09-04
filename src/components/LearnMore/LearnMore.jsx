import React from "react";
import './LearnMore.css';

function LearnMore({
  moviesToRender,
  handlerMoreFilms,
  isRenderedLearnMore,
  movies
}) {

  return (
    <div className="learn-more size-container">
      {isRenderedLearnMore ?
      
        <button
          className="learn-more__button"
          aria-label="show more films"
          onClick={handlerMoreFilms}
        >
          Ещё
        </button>
      : ""}

    </div>

  );
}

export default LearnMore;

