import React, { useState, useEffect, useCallback } from "react";
import './Movies.css';
import LearnMore from "../LearnMore/LearnMore";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useResize } from "../../components/hooks/useResize";
// import { ErrorMessage } from "@hookform/error-message";

function Movies({
  movies,
  isLoggedIn,
  handleSaveMovie,
  requestMessage,
  setRequestMessage,
  handleSearchMovie,
  isShortMovies,
  setIsShortMovies,
  handleDeleteMovie
}) {

  const [addMovies, setAddMovies] = useState(0);
  const [isRenderedLearnMore, setIsRenderedLearnMore] = useState(false);
  //стейт для поисковой строки movies
  const [query, setQuery] = useState(
    localStorage.getItem("moviesSearchQuery") || "",
  );

  const { isWideScreen, isMiddleScreen } = useResize();

  //количество карточек на странице при первой отрисовке
  const count = isWideScreen ?
    12 :
    isMiddleScreen ?
      8 :
      5;

  //сколько показывать фильмов по кнопке "еще"?
  function handlerMoreFilms() {
    isWideScreen ?
      setAddMovies(addMovies + 3) :
      isMiddleScreen ?
        setAddMovies(addMovies + 2) :
        setAddMovies(addMovies + 2);
  }

  //сколько карточек показано сейчас?
  const showedMovies = count + addMovies;

  //определить количество карточек к показу
  const moviesForRender = () => {
    if (movies.length > 0) {
      return movies.slice(0, showedMovies);
    } return [];
  };

  const moviesToRender = movies.length - showedMovies;

  useEffect(() => {
    if (moviesToRender > 0) { // || movies.length === 0
      setIsRenderedLearnMore(true)
    } else {
      setIsRenderedLearnMore(false)
    }
  }, [movies, showedMovies]);

  function handleSearch(query) {
    handleSearchMovie(query)
    setQuery(query);
    localStorage.setItem("moviesSearchQuery", query);
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
        setQuery={setQuery}
      // isShowErrorMessage={isShowErrorMessage}
      />
      <MoviesCardList
        isMoviePage={true}
        movies={moviesForRender()} //универсальный пропс movies, не путать со стейтом
        isLoggedIn={isLoggedIn}
        handleSaveMovie={handleSaveMovie}
        handleSearchMovie={handleSearchMovie}
        requestMessage={requestMessage}
        handleDeleteMovie={handleDeleteMovie}
      // isSaved={isShortMovies} 
      //этот параметр отличается у фильмов и сохраненных фильмов
      />
      <LearnMore
        moviesToRender={moviesToRender}
        handlerMoreFilms={handlerMoreFilms}
        isRenderedLearnMore={isRenderedLearnMore}
        movies={moviesForRender()}
      />
    </>
  );
}

export default Movies;