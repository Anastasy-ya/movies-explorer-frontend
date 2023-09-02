import React, { useState, useEffect } from "react";
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormWithValidation from "../hooks/usevalidate";
import RequestMessage from "../RequestMessage/RequestMessage";

function SearchForm({
  handleSearchMovie,
  requestMessage,
  // handlerChangeTumbler,
  setIsShortMovies,
  isShortMovies
  // movies,
  // setIsShort,
  // isShort
}) {

   //поисковые строки
  //  const [savedMoviesSearchQuery, setSavedMoviesSearchQuery] = React.useState("");
   const [moviesSearchQuery, setMoviesSearchQuery] = React.useState(() => {
    const checkStorage = localStorage.getItem("moviesSearchQuery");
    return checkStorage ? checkStorage : ""
   });
  
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('moviesSearchQuery', values['search'])
    // setMoviesSearchQuery(moviesSearchQuery)
    handleSearchMovie(moviesSearchQuery); //values['search']
    //values['search'] || localStorage.getItem('moviesSearchQuery')
  };

  // useEffect(() => {
  //   setMoviesSearchQuery(moviesSearchQuery)
  // }, [values['search']]);


  return (
    <div className="search-input">
      <div className="search-input__size-container size-container">

        <form
          className="search-input__form form"
          onSubmit={(e) => handleSubmit(e)}>

          <input
            type="text"
            name="search"
            className="search-input__field"
            value={values.search || moviesSearchQuery} // || moviesSearchQuery
            placeholder="Фильм"//{placeholder}
            onChange={handleChange}
            aria-label="write keywords for searching"
            // autoСomplete="off"
            required
          />

          <button
            type="submit"
            className="search-input__button"
            aria-label="search films"
            // disabled={!isValid} //раскомментировать для показа всех фильмов
          >Найти
          </button>

        </form>

        <RequestMessage
          requestMessage={requestMessage}
          parent={"search-input"}
        />

        <FilterCheckbox
          // handlerChangeTumbler={handlerChangeTumbler}
          setIsShortMovies={setIsShortMovies}
          isShortMovies={isShortMovies}
          handleSubmit={handleSubmit}
        // movies={movies}
        // setIsShort={setIsShort}
        // isShort={isShort}
        />
      </div>
    </div>

  );
}

export default SearchForm;