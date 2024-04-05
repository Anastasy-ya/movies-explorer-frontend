import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  isMoviePage,
  movies,
  handleSaveMovie,
  handleDeleteMovie,
}) {

  return (
    <section className="card-list">
      <ul className="card-list__size-container size-container">
        {movies.length > 0 && movies.map((movie, index) => (
          <li className="card" key={index}>
          <MoviesCard
            key={index}
            movie={movie}
            isMoviePage={isMoviePage}
            handleSaveMovie={handleSaveMovie} //from movies
            handleDeleteMovie={handleDeleteMovie} //from saved-movies
          />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;