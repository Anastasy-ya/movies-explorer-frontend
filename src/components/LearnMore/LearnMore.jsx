import React from "react";
import './LearnMore.css';
// не забыть поменять теги на ашки
function LearnMore() {
  return (
      <div className="block-learn-more size-container">
        <button 
        className="block-learn-more__button"
        aria-label="show more films"
        >Ещё</button>

      </div>

  );
}

export default LearnMore;