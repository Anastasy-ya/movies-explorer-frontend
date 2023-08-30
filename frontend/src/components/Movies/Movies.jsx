import React from 'react';
import './Movies.css';
import LearnMore from "../LearnMore/LearnMore";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ 
  movies, 
  isLoggedIn, 
  handleSaveMovie,  
  requestMessage,
  handleSearchMovie }) {

  return (
    <>
      <MoviesCardList 
        isMoviePage={true}
        movies={movies}
        isLoggedIn={isLoggedIn}
        handleSaveMovie={handleSaveMovie}
        handleSearchMovie={handleSearchMovie}
        requestMessage={requestMessage}
      />
      <LearnMore 
        movies={movies}
      />
    </>
  );
}

export default Movies;