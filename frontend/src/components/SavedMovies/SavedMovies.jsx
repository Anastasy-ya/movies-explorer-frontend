import React, { useState, useEffect } from "react";
import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  movies,
  isLoggedIn,
  handleDeleteMovie,
  handleSearchMovie, //тут должна быть другая функция
  requestMessage,
  isShortMovies,
  setIsShortMovies
  // handlerChangeTumblerSavedMovies,
}) {

  return (
    <>
      <SearchForm
        requestMessage={requestMessage}
        handleSearchMovie={handleSearchMovie}
        setIsShortMovies={setIsShortMovies}
        isShortMovies={isShortMovies}
      />
      <MoviesCardList
        isMoviePage={false}
        movies={movies} //универсальный пропс movies, не путать со стейтом  || []
        isLoggedIn={isLoggedIn}
        handleDeleteMovie={handleDeleteMovie}
        handleSearchMovie={handleSearchMovie}
        requestMessage={requestMessage}
      // isSaved={isShortSavedMovies}
      />
    </>
  );
}

export default SavedMovies;