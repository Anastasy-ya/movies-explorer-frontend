import React from 'react';
import './MoviesCard.css';
import { BASE_URL, MOVIES_URL } from "../../utils/consts";
import { Link } from 'react-router-dom';

function MoviesCard(props) { //pageMovie(true/false)

  const saveOrDeleteText = props.isMoviePage ? "save movie" : "delete movie from saved";

  let movieDuration = `${Math.floor(props.movie.duration / 60)}ч ${props.movie.duration % 60}м`


  return (
    <li className="card">
      <div className="card__info">
        <div className="card__text-block">
          <h2 className="card__header">{props.movie.nameRU}</h2>
          <p className="card__subtitle">{movieDuration}</p>
        </div>
        <button
          className={`card__icon ${props.isMoviePage ? "card__icon_type_save" : "card__icon_type_delete"}`}
        /*card__icon_type_save_active класс добавится на этапе добавления функционала*/
        // alt={saveOrDeleteText}
        // aria-label={saveOrDeleteText}
        ></button>
      </div>

      <Link
        to={props.movie.trailerLink}
        // className="about-me__gihub"
        aria-label="link to Github"
        target="_blank"
      >
        <img
          src={`${MOVIES_URL}${props.movie.image.url}`}
          // `${BASE_URL}${props.movie.image.url}`
          className="card__image"
          alt="Movie"
        />
      </Link>

    </li>
  );
}

export default MoviesCard;