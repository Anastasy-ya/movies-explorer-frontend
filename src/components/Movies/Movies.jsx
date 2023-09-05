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
  setRequestMessage,
  handleSearchMovie,
  isShortMovies,
  setIsShortMovies,
  handleDeleteMovie,
  isShortSavedMovies,
  setIsShortSavedMovies,
}) {

  const [addMovies, setAddMovies] = useState(0);
  const [isRenderedLearnMore, setIsRenderedLearnMore] = useState(false);
  //стейт для поисковой строки movies
  // eslint-disable-next-line no-unused-vars
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
    if (moviesToRender > 0) {
      setIsRenderedLearnMore(true)
    } else {
      setIsRenderedLearnMore(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        isShortSavedMovies={isShortSavedMovies}
        setIsShortSavedMovies={setIsShortSavedMovies}
      />
      <MoviesCardList
        isMoviePage={true}
        movies={moviesForRender()} //универсальный пропс movies, не путать со стейтом
        isLoggedIn={isLoggedIn}
        handleSaveMovie={handleSaveMovie}
        handleSearchMovie={handleSearchMovie}
        requestMessage={requestMessage}
        handleDeleteMovie={handleDeleteMovie}
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