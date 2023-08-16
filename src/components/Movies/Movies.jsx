import React from 'react';
import './Movies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import LearnMore from "../LearnMore/LearnMore";

function Movies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList />
      <LearnMore />
    </>
  );
}

export default Movies;