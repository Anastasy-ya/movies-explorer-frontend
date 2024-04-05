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
  handleSearchMovie,
  isShortMovies,
  setIsShortMovies,
  handleDeleteMovie,
  isShortSavedMovies,
  setIsShortSavedMovies,
  openPopup
}) {

  const [addMovies, setAddMovies] = useState(0);
  const [isRenderedLearnMore, setIsRenderedLearnMore] = useState(false);
  // state for the search string movies
  // eslint-disable-next-line no-unused-vars
  const [query, setQuery] = useState(
    localStorage.getItem("moviesSearchQuery") || "",
  );

  const { isWideScreen, isMiddleScreen } = useResize();

  // count the number of movies to show
  function handlerMoreFilms() {
    isWideScreen ?
      setAddMovies(addMovies + 3) :
      isMiddleScreen ?
        setAddMovies(addMovies + 2) :
        setAddMovies(addMovies + 2);
  }

  function findShowedMovies() {
    // number of default cards
    const count = isWideScreen ?
      12 :
      isMiddleScreen ?
        8 :
        5;
    // return amount of cards now
    return count + addMovies;
  }

  const showedMovies = findShowedMovies();

  //number of cards to show
  function moviesForRender() {
    if (movies.length > 0) {
      return movies.slice(0, showedMovies);
    } else {
      return [];
    }
  };

  useEffect(() => {
    const moviesToRender = movies.length - showedMovies;
    if (moviesToRender > 0) {
      setIsRenderedLearnMore(true)
    } else {
      setIsRenderedLearnMore(false);
    }
  }, [movies, showedMovies]);

  function handleSearch(query, e) {
    e.preventDefault();
    if (query.length === 0) {
      openPopup("You need to enter a keyword");
      return;
    }
    handleSearchMovie(query, e)
    setQuery(query);
    localStorage.setItem("moviesSearchQuery", query);
  }

  return (
    <>
      <SearchForm
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
        movies={moviesForRender()} //universal movie props, not to be confused with state
        isLoggedIn={isLoggedIn}
        handleSaveMovie={handleSaveMovie}
        handleSearchMovie={handleSearchMovie}
        handleDeleteMovie={handleDeleteMovie}
        openPopup={openPopup}
      />
      <LearnMore
        handlerMoreFilms={handlerMoreFilms}
        isRenderedLearnMore={isRenderedLearnMore}
      />
    </>
  );
}

export default Movies;