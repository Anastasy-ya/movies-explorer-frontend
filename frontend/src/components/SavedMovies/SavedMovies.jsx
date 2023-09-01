import React, { useState, useEffect } from "react";
import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import LearnMore from "../LearnMore/LearnMore";
import SearchForm from "../SearchForm/SearchForm";
import { useResize } from "../../components/hooks/useResize";

function SavedMovies({
  movies,
  isLoggedIn,
  handleSaveMovie,
  handleSearchMovie, //тут должна быть другая функция
  requestMessage,
  // isShortSavedMovies,
  // setIsShortSavedMovies
  handlerChangeTumblerSavedMovies
}) {

  const { isWideScreen, isMiddleScreen, isNarrowScreen } = useResize();


  return (
    <>
      <SearchForm
        requestMessage={requestMessage}
        // movies={films || []}
        handleSearchMovie={handleSearchMovie}
        // setIsShort={setIsShortSavedMovies}
        // isShort={isShortSavedMovies}
        handlerChangeTumbler={handlerChangeTumblerSavedMovies}
      />
      <MoviesCardList
        isMoviePage={false}
        movies={movies || []} //универсальный пропс movies, не путать со стейтом
        isLoggedIn={isLoggedIn}
        handleSaveMovie={handleSaveMovie}
        handleSearchMovie={handleSearchMovie}
        requestMessage={requestMessage}
      // isSaved={isShortSavedMovies}
      />
    </>
  );
}

export default SavedMovies;