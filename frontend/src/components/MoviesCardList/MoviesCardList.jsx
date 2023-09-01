import React, { useState, useEffect } from "react";
import './MoviesCardList.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList({
  isMoviePage,
  movies,
  //здесь и movies для страницы movies и saved-movies для соответствующей страницы
  isLoggedIn,
  handleSaveMovie,
  handleSearchMovie,
  requestMessage,
  handleDeleteMovie

}) {

  // function isSavedMovie(movie) {
  //   return savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId);
  // }

  return (
    <section className="card-list">

      <ul className="card-list__size-container size-container">
        {movies.map((movie) => (

          <MoviesCard
            key={movie.id}
            movie={movie}
            isMoviePage={isMoviePage}
            handleSearchMovie={handleSearchMovie}
            requestMessage={requestMessage}
            handleSaveMovie={handleSaveMovie} //попадает из movies
            handleDeleteMovie={handleDeleteMovie} //попадает из saved-movies

          />

        ))}
      </ul>
      
    </section>
  );
}

export default MoviesCardList;