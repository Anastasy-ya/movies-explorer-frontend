import React from 'react';
import './Movies.css';

import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ movies, isLoggedIn, handleSaveMovie }) {
  return (
    <>
      <MoviesCardList 
        isMoviePage={true}
        movies={movies}
        isLoggedIn={isLoggedIn}
        handleSaveMovie={handleSaveMovie}
      />
    </>
  );
}

export default Movies;