import React from 'react';
import './MoviesCard.css';
import { BASE_URL } from "../../utils/consts";

function MoviesCard(props) { //pageMovie(true/false)

  const saveOrDeleteText = props.isMoviePage ? "save movie" : "delete movie from saved";

  return (
    <li className="card">
      <div className="card__info">
        <div className="card__text-block">
          <h2 className="card__header">{props.movie.nameRU}</h2>
          <p className="card__subtitle">{props.movie.duration}</p>
        </div>
        <button
          className={`card__icon ${props.isMoviePage ? "card__icon_type_save" : "card__icon_type_delete"}`}
        /*card__icon_type_save_active класс добавится на этапе добавления функционала*/
        // alt={saveOrDeleteText}
        // aria-label={saveOrDeleteText}
        ></button>
      </div>
      {console.log(`${BASE_URL}${props.movie.image.url}`)}
      {/* <img
        src=`${BASE_URL}${props.movie.image.url}`
        className="card__image"

      /> */}
    </li>
  );
}

export default MoviesCard;