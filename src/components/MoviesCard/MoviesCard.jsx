import React from 'react';
import './MoviesCard.css';

function MoviesCard() { // заменить дивы на заголовки
  return (
    <li className="card">
      {/* <div className="card__shadow"> */}
      
        <div className="card__info">
          <div className="card__text-block">
            <div className="card__header">33 слова о дизайне</div>
            <div className="card__subtitle">1ч 47м</div>
          </div>
            <button 
            className="card__delete-icon" 
            alt="delete movie from list"
            aria-label="delete movie from your list"
            ></button>
        </div>
        
        <div className="card__image" alt=""></div>
      {/* </div> */}
    </li>
  );
}

export default MoviesCard;