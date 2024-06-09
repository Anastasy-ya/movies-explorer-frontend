import React from "react";
import './LearnMore.css';

function LearnMore({
  handlerMoreFilms,
  isRenderedLearnMore,
}) {

  return (
    <div className="learn-more size-container">
      {isRenderedLearnMore ?
      
        <button
          className="learn-more__button"
          aria-label="show more films"
          onClick={handlerMoreFilms}
        >
          Show more
        </button>
      : ""}

    </div>

  );
}

export default LearnMore;

