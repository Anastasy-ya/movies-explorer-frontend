import React from 'react';
import './MoviesCard.css';
import { BASE_URL, MOVIES_URL } from "../../utils/consts";
import { Link } from 'react-router-dom';

function MoviesCard({
  key,
  movie,
  isMoviePage,
}) { //pageMovie(true/false)

  const saveOrDeleteText = isMoviePage ? "save movie" : "delete movie from saved";

  let movieDuration = `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`

  function saveOrDeleteHandler(movie) {
    
  }

  return (
    <li className="card">
      <div className="card__info">
        <div className="card__text-block">
          <h2 className="card__header">{movie.nameRU}</h2>
          <p className="card__subtitle">{movieDuration}</p>
        </div>
        <button
          className={`card__icon ${isMoviePage ? "card__icon_type_save" : "card__icon_type_delete"}`}
          /*card__icon_type_save_active класс добавится на этапе добавления функционала*/
          aria-label={saveOrDeleteText}
          onClick={(movie) => saveOrDeleteHandler(movie)}
        ></button>
      </div>

      <Link
        to={movie.trailerLink}
        // className="about-me__gihub"
        aria-label="link to Github"
        target="_blank"
      >
        <img
          src={`${MOVIES_URL}${movie.image.url}`}
          // `${BASE_URL}${movie.image.url}`
          className="card__image"
          alt="Movie"
        />
      </Link>

    </li>
  );
}

export default MoviesCard;