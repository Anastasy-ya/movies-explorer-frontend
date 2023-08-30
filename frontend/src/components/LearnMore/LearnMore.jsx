import React from "react";
import './LearnMore.css';

function LearnMore({ movies }) {

  return ( /*добавить зависимость от разности карточек и отображенных карточек */
    <div className="learn-more size-container">
      {movies.length > 0 ?
        <button
          className="learn-more__button"
          aria-label="show more films"
        >
          Ещё
        </button> :
        <div></div> /*проверить по макету какая там высота заглушки */
        }

    </div>

  );
}

export default LearnMore;