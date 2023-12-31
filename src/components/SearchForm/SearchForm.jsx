import React, { useEffect, useState } from "react";
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
// import RequestMessage from "../RequestMessage/RequestMessage";
import AuthForm from "../AuthForm/AuthForm";
import { ErrorMessage } from "@hookform/error-message";
import { useLocation } from "react-router-dom";

function SearchForm({
  handleSearchMovie,
  // requestMessage,
  // setRequestMessage,
  setIsShortMovies,
  isShortMovies,
  onSearch,
  setQuery,
  setSavedQuery,
  onSavedSearch,
  isShortSavedMovies,
  setIsShortSavedMovies,
}) {

  

  // const [savedString, setSavedString] = useState(
  //   // localStorage.getItem("savedMoviesSearchQuery") || 
  //   "",
  // );

  const { register, errors, handleSubmit, watch, setValue } = AuthForm();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/movies") {
      setValue("search", localStorage.getItem("moviesSearchQuery") || ""); //динамические значения полей
    } else {
      setValue("search", savedString || ""); //в строке поиска
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const onSubmit = (data, e) => {
    e.preventDefault();
    if (location.pathname === "/movies") {
      onSearch(data.search, e);
    } else {
      onSavedSearch(data.search, e);
    }
  };

  const savedString = watch("search", "");
  const query = watch("search", localStorage.getItem("moviesSearchQuery") || "");

  useEffect(() => {
    if (location.pathname === "/movies") {
      localStorage.setItem("moviesSearchQuery", query || "");
      setQuery(query);
    } else {
      // localStorage.setItem("savedMoviesSearchQuery", savedQuery || "");
      // setSavedString(savedQuery || "");
      setSavedQuery(savedString); // видимо это вообще не нужно
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, savedString]);

  return (
    <div className="search-input">
      <div className="search-input__size-container size-container">

        <form
          className="search-input__form form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >

          <input
            type="text"
            name="search"
            className="search-input__field"
            placeholder="Фильм"
            aria-label="write keywords for searching"
            {...register("search")}
          />

          <button
            type="submit"
            className="search-input__button"
            aria-label="search films"
          >Найти
          </button>

        </form>

        <FilterCheckbox
          setIsShortMovies={setIsShortMovies}
          isShortMovies={isShortMovies}
          isShortSavedMovies={isShortSavedMovies}
          setIsShortSavedMovies={setIsShortSavedMovies}
        // handleSubmit={handleSubmit}
        />
      </div>
    </div>

  );
}

export default SearchForm;
