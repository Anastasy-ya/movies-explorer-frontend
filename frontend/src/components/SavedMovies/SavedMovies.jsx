import React, { useState, useEffect } from "react";
import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import LearnMore from "../LearnMore/LearnMore";
import SearchForm from "../SearchForm/SearchForm";

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

  let films;
  // useEffect((isShortSavedMovies) => {
    // console.log('сработал юзэффект')
    // if (isShortSavedMovies) { // && movies.length > 0
    //   films = movies.filter((film) => film.duration <= 40)

    //   // setIsShortSavedMovies(films;
    //   console.log(films, 'итоговое значение фильтрации')
    // }
  // }, [isShortSavedMovies, movies]);

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