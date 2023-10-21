import React, { useState } from "react";
import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  movies,
  isLoggedIn,
  handleDeleteMovie,
  // requestMessage,
  // setRequestMessage,
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
      openPopup("Нужно ввести ключевое слово");
      return;
    }
    handleSearchMovie(query, e);
  }

  return (
    <>
      <SearchForm
        // requestMessage={requestMessage}
        // setRequestMessage={setRequestMessage}
        handleSearchMovie={handleSearchMovie}
        setIsShortMovies={setIsShortMovies}
        isShortMovies={isShortMovies}
        onSavedSearch={handleSearch}
        setSavedQuery={setSavedQuery} //значение отличается от movies тк сохраняется другой стейт
        isShortSavedMovies={isShortSavedMovies}
        setIsShortSavedMovies={setIsShortSavedMovies}
      />
      <MoviesCardList
        isMoviePage={false}
        movies={movies} //универсальный пропс movies, не путать со стейтом
        isLoggedIn={isLoggedIn}
        handleDeleteMovie={handleDeleteMovie}
        handleSearchMovie={handleSearchMovie}
        openPopup={openPopup}
        // requestMessage={requestMessage}
      />
    </>
  );
}

export default SavedMovies;
