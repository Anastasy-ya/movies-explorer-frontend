import React from 'react';
import './Movies.css';

import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
  return (
    <>
      <MoviesCardList isMoviePage={true}/>
    </>
  );
}

export default Movies;