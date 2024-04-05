import React, { useState } from "react";
import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  movies,
  isLoggedIn,
  handleDeleteMovie,
  handleSearchMovie,
  isShortMovies,
  setIsShortMovies,
  isShortSavedMovies,
  setIsShortSavedMovies,
  openPopup
}) {

  // eslint-disable-next-line no-unused-vars
  const [savedQuery, setSavedQuery] = useState("");

  function handleSearch(query, e) {
    e.preventDefault();
    if (query.length === 0) {
      openPopup("You need to enter a keyword");
      return;
    }
    handleSearchMovie(query, e);
  }

  return (
    <>
      <SearchForm
        handleSearchMovie={handleSearchMovie}
        setIsShortMovies={setIsShortMovies}
        isShortMovies={isShortMovies}
        onSavedSearch={handleSearch}
        setSavedQuery={setSavedQuery} //the value is different from movies because the state is different
        isShortSavedMovies={isShortSavedMovies}
        setIsShortSavedMovies={setIsShortSavedMovies}
      />
      <MoviesCardList
        isMoviePage={false}
        movies={movies}  //universal movie props, not to be confused with state
        isLoggedIn={isLoggedIn}
        handleDeleteMovie={handleDeleteMovie}
        handleSearchMovie={handleSearchMovie}
        openPopup={openPopup}
      />
    </>
  );
}

export default SavedMovies;
