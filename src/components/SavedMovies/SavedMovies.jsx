import React, { useState, useEffect } from "react";
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

  const [savedQuery, setSavedQuery] = useState(
    localStorage.getItem("savedMoviesSearchQuery") || "",
  );

  function handleSearch(query) {
    // setRequestMessage(movies ? "Ничего не найдено" : 0)
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
        onSearch={handleSearch}
        setQuery={setSavedQuery} //значение отличается от movies тк сохраняется другой стейт
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