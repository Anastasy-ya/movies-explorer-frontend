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
  // setIsOpenConfirmationPopup
}) {
  // openPopup('Ничего не найдено');

  // eslint-disable-next-line no-unused-vars
  const [savedQuery, setSavedQuery] = useState(
    localStorage.getItem("savedMoviesSearchQuery") || "",
  );

  function handleSearch(query) {
    if (query.length === 0) {
      openPopup("Нужно ввести ключевое слово");
      return;
    }
    setSavedQuery(query);
    handleSearchMovie(query)
    localStorage.setItem("savedMoviesSearchQuery", query || "");
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
