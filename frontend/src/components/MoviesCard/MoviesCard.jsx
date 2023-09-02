import React from 'react';
import './MoviesCard.css';
import { BASE_URL, MOVIES_URL } from "../../utils/consts";
import { Link } from 'react-router-dom';

function MoviesCard({
  movie,
  isMoviePage,
  handleSaveMovie,
  handleDeleteMovie
}) {


  const saveOrDeleteText = isMoviePage ? "save movie" : "delete movie from saved";
  const { _id, nameRU, duration, trailerLink } = movie;
  let movieDuration = `${Math.floor(duration / 60)}ч ${duration % 60}м`
 console.log(movie, 'пришло на отрисовку')

  function saveOrDeleteHandler() {
    console.log(movie, _id, 'movie, id')
    isMoviePage ? handleSaveMovie(movie) : handleDeleteMovie(_id)
  }

  return (
    <li className="card">
      <div className="card__info">
        <div className="card__text-block">
          <h2 className="card__header">{nameRU}</h2>
          <p className="card__subtitle">{movieDuration}</p>
        </div>
        <button
          className={`card__icon ${movie.buttonLikeType === "liked" 
          ? "card__icon_type_save_active" 
          : movie.buttonLikeType === "unliked" 
          ? "card__icon_type_save" 
          : "card__icon_type_delete"}`}
          /*card__icon_type_save_active класс добавится на этапе добавления функционала*/
          aria-label={saveOrDeleteText}
          onClick={saveOrDeleteHandler}
        ></button>
      </div>

      <Link
        to={trailerLink}
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