import React from 'react';
import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import LearnMore from "../LearnMore/LearnMore";

function SavedMovies({ 
  movies, 
  isLoggedIn, 
  handleSaveMovie, 
  handleSearchMovie,
  requestMessage 
}) {

  return (
    <>
      <MoviesCardList 
        isMoviePage={false}
        movies={movies}
        isLoggedIn={isLoggedIn}
        handleSaveMovie={handleSaveMovie}
        handleSearchMovie={handleSearchMovie}
        requestMessage={requestMessage}
      />
    </>
  );
}

export default SavedMovies;