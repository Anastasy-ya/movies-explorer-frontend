import React from 'react';
import './MoviesCard.css';

function MoviesCard() {
  return (
    <li className="card">      
        <div className="card__info">
          <div className="card__text-block">
            <div className="card__header">33 слова о дизайне</div>
            <div className="card__subtitle">1ч 47м</div>
          </div>
            <button 
            className="
              card__icon 
              card__icon_type_delete 
              card__icon_type_save 
              " /*card__icon_type_save_active */
            alt="delete movie from list"
            aria-label="delete movie from your list"
            ></button>
        </div>
        
        <div className="card__image" alt="movie card"></div>
    </li>
  );
}

export default MoviesCard;