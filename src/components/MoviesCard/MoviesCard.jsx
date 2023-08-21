import React from 'react';
import './MoviesCard.css';

function MoviesCard(props) { //pageMovie(true/false)

  const saveOrDeleteText = props.isMoviePage ? "save movie" : "delete movie from saved";

  return (
    <li className="card">      
        <div className="card__info">
          <div className="card__text-block">
            <div className="card__header">33 слова о дизайне</div>
            <div className="card__subtitle">1ч 47м</div>
          </div>
          {console.log(props.isMoviePage)}
            <button
            className={`card__icon ${props.isMoviePage ? "card__icon_type_save" : "card__icon_type_delete"}`}
             /*card__icon_type_save_active класс добавится на этапе добавления функционала*/
            alt={saveOrDeleteText}
            // "delete movie from list"
            aria-label={saveOrDeleteText}
            ></button>
        </div>
        
        <div className="card__image" alt="movie card"></div>
    </li>
  );
}

export default MoviesCard;