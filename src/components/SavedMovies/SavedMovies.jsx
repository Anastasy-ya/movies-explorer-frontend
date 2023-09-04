import React, { useState } from "react";
import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  movies,
  isLoggedIn,
  handleDeleteMovie,
  requestMessage,
  setRequestMessage,
  handleSearchMovie,
  isShortMovies,
  setIsShortMovies
}) {

  // eslint-disable-next-line no-unused-vars
  const [savedQuery, setSavedQuery] = useState(
    localStorage.getItem("savedMoviesSearchQuery") || "",
  );

  function handleSearch(query) {
    setSavedQuery(query);
    handleSearchMovie(query)
    localStorage.setItem("savedMoviesSearchQuery", query);
  }

  return (
    <>
      <SearchForm
        requestMessage={requestMessage}
        setRequestMessage={setRequestMessage}
        handleSearchMovie={handleSearchMovie}
        setIsShortMovies={setIsShortMovies}
        isShortMovies={isShortMovies}
        onSavedSearch={handleSearch}
        setSavedQuery={setSavedQuery} //значение отличается от movies тк сохраняется другой стейт
      />
      <MoviesCardList
        isMoviePage={false}
        movies={movies} //универсальный пропс movies, не путать со стейтом
        isLoggedIn={isLoggedIn}
        handleDeleteMovie={handleDeleteMovie}
        handleSearchMovie={handleSearchMovie}
        requestMessage={requestMessage}
      />
    </>
  );
}

export default SavedMovies;
