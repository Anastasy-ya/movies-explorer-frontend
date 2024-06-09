import React from 'react';
import './MoviesCard.css';
import { MOVIES_URL } from "../../utils/consts";
import { Link } from 'react-router-dom';

function MoviesCard({
  movie,
  isMoviePage,
  handleSaveMovie,
  handleDeleteMovie
}) {

  const saveOrDeleteText = isMoviePage ? "save movie" : "delete movie from saved";
  const { id, nameRU, duration, trailerLink, movieId } = movie;
  let movieDuration = `${Math.floor(duration / 60)}hr ${duration % 60}мin`

  function saveOrDeleteHandler(e) {
    e.preventDefault();
    movie.buttonLikeType === "unliked" ? handleSaveMovie(movie) : handleDeleteMovie(isMoviePage ? id : movieId)
  }

  return (
    <>
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
          /*third class type is card__icon_type_save_active*/
          aria-label={saveOrDeleteText}
          onClick={(e) => saveOrDeleteHandler(e)}
        ></button>
      </div>

      <Link
        to={trailerLink}
        aria-label="link trailer"
        target="_blank"
      >
        <img
          src={`${isMoviePage ? (MOVIES_URL + movie.image.url) : (movie.image)}`}
          className="card__image"
          alt="Movie"
        />
      </Link>
    </>

  );
}

export default MoviesCard;