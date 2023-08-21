import React from 'react';
import './Movies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import LearnMore from "../LearnMore/LearnMore";

function Movies() {
  return (
    <>
      <SearchForm />
      {/* <MoviesCardList /> */}
      <MoviesCardList isMoviePage={true}/>
      <LearnMore />
    </>
  );
}

export default Movies;