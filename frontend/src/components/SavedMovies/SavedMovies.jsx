import React from 'react';
import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ movies, isLoggedIn, handleSaveMovie }) {
  return (
    <>
      <MoviesCardList 
        isMoviePage={false}
        movies={movies}
        isLoggedIn={isLoggedIn}
        handleSaveMovie={handleSaveMovie}
      />
    </>
  );
}

export default SavedMovies;