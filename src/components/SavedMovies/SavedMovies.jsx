import React from 'react';
import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
  return (
    <>
      <MoviesCardList isMoviePage={false}/>
    </>
  );
}

export default SavedMovies;