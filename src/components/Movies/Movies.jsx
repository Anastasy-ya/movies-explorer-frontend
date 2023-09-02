import React, { useState, useEffect, useCallback } from "react";
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
  handleSearchMovie,
  isShortMovies, //undefined
  // setIsShortMovies
  // handlerChangeTumbler,
  setIsShortMovies,
  handleDeleteMovie
}) {

  // console.log('всего карточек изначально', movies.length)

  const [addMovies, setAddMovies] = useState(0);
  const [isRenderedLearnMore, setIsRenderedLearnMore] = useState(false);

  const { isWideScreen, isMiddleScreen, isNarrowScreen } = useResize();

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
      // console.log('показано карточек:', movies.slice(0, showedMovies))
      return movies.slice(0, showedMovies);
    } return [];
  };

  const moviesToRender = movies.length - showedMovies;

  
  useEffect(() => {
    // console.log('сколько не показано?', movies.length - showedMovies)
    
    if (moviesToRender > 0) { // || movies.length === 0
      setIsRenderedLearnMore(true)
    } else {
      setIsRenderedLearnMore(false)
    }
    
  }, [movies, showedMovies]);

// console.log(showedMovies, '-количество к отрисовке', isRenderedLearnMore, 'isRenderedLearnMore');

  return (
    <>
      <SearchForm
        requestMessage={requestMessage}
        handleSearchMovie={handleSearchMovie}
        setIsShortMovies={setIsShortMovies}
        isShortMovies={isShortMovies}
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
      />
    </>
  );
}

export default Movies;