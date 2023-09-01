import React, { useState, useEffect } from "react";
import './Movies.css';
import LearnMore from "../LearnMore/LearnMore";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useResize } from "../../components/hooks/useResize";

function Movies({
  movies,
  isLoggedIn,
  handleSaveMovie,
  requestMessage,
  handleSearchMovie,
  isShortMovies, //undefined
  // setIsShortMovies
  // handlerChangeTumbler,
  setIsShortMovies
}) {

  const { isWideScreen, isMiddleScreen, isNarrowScreen } = useResize();

  

  return (
    <>
      <SearchForm
        requestMessage={requestMessage}
        handleSearchMovie={handleSearchMovie}
        // handlerChangeTumbler={handlerChangeTumbler}
        setIsShortMovies={setIsShortMovies}
        isShortMovies={isShortMovies}
      />
      <MoviesCardList
        isMoviePage={true}
        movies={movies} //универсальный пропс movies, не путать со стейтом
        isLoggedIn={isLoggedIn}
        handleSaveMovie={handleSaveMovie}
        handleSearchMovie={handleSearchMovie}
        requestMessage={requestMessage}
      // isSaved={isShortMovies} 
      //этот параметр отличается у фильмов и сохраненных фильмов
      />
      <LearnMore
        movies={movies}
      />
    </>
  );
}

export default Movies;