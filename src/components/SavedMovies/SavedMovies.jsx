import React from 'react';
import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import LearnMore from "../LearnMore/LearnMore";

function SavedMovies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList isMoviePage={false}/>
      <LearnMore />
    </>
  );
}

export default SavedMovies;