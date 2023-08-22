import React from 'react';
import './MoviesCard.css';

function MoviesCard(props) { //pageMovie(true/false)

  const saveOrDeleteText = props.isMoviePage ? "save movie" : "delete movie from saved";

  return (
    <li className="card">      
        <div className="card__info">
          <div className="card__text-block">
            <h2 className="card__header">33 слова о дизайне</h2>
            <p className="card__subtitle">1ч 47м</p>
          </div>
            <button
            className={`card__icon ${props.isMoviePage ? "card__icon_type_save" : "card__icon_type_delete"}`}
             /*card__icon_type_save_active класс добавится на этапе добавления функционала*/
            // alt={saveOrDeleteText}
            // aria-label={saveOrDeleteText}
            ></button>
        </div>
        
        <div className="card__image"></div>
    </li>
  );
}

export default MoviesCard;