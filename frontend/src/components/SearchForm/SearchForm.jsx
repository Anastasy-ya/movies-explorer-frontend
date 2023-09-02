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
   const [moviesSearchQuery, setMoviesSearchQuery] = React.useState(() => {
    const checkStorage = localStorage.getItem("moviesSearchQuery");
    return checkStorage ? checkStorage : ""
   });
   const [savedMoviesSearchQuery, setSavedMoviesSearchQuery] = React.useState("");

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchMovie(values['search']); //values['search']
    localStorage.setItem('moviesSearchQuery', values['search'])
    // resetForm();
  };

  // useEffect(() => {
  //   setMoviesSearchQuery(values['search'])
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
            value={values.search ?? moviesSearchQuery} // || moviesSearchQuery
            placeholder="Фильм"//{placeholder}
            onChange={handleChange}
            aria-label="write keywords for searching"
            // autoСomplete="off"
            required
          />

          <button
            type="submit" //добавить тайт всем сабмитам
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