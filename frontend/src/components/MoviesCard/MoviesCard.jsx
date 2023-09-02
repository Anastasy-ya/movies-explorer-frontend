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
  const { id, nameRU, duration, trailerLink, movieId } = movie;
  let movieDuration = `${Math.floor(duration / 60)}ч ${duration % 60}м`
  // let movieDuration = `${Math.floor(duration / 60)}ч ${duration % 60}м`;
//  console.log(movie, 'пришло на отрисовку')

  function saveOrDeleteHandler() {
    // console.log(movie, _id, 'movie, id')
    
    movie.buttonLikeType === "unliked" ? handleSaveMovie(movie) : handleDeleteMovie(isMoviePage ? id : movieId)
    //всегда если класс анлайк, нужно сохранить карточку, во всех остальных случаях удалять
  }

  return (
    // <li className="card">
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
          src={`${isMoviePage ? (MOVIES_URL + movie.image.url) : (movie.image)}`}
          // `${BASE_URL}${movie.image.url}`
          className="card__image"
          alt="Movie"
        />
      </Link>
</>
    // </li>
  );
}

export default MoviesCard;