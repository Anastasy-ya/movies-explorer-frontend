import React, { useEffect } from "react";
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import AuthForm from "../AuthForm/AuthForm";
import { useLocation } from "react-router-dom";

function SearchForm({
  setIsShortMovies,
  isShortMovies,
  onSearch,
  setQuery, //for movies page
  setSavedQuery, //for saved movies page
  onSavedSearch,
  isShortSavedMovies,
  setIsShortSavedMovies,
}) {

  // eslint-disable-next-line no-unused-vars
  const { register, errors, handleSubmit, watch, setValue } = AuthForm();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/movies") {
      setValue("search", localStorage.getItem("moviesSearchQuery") || "");
    } else {
      setValue("search", savedString || "");
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
      setSavedQuery(savedString);
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
            placeholder="Movie"
            aria-label="write keywords for searching"
            {...register("search")}
          />

          <button
            type="submit"
            className="search-input__button"
            aria-label="search films"
          >Find
          </button>

        </form>

        <FilterCheckbox
          setIsShortMovies={setIsShortMovies}
          isShortMovies={isShortMovies}
          isShortSavedMovies={isShortSavedMovies}
          setIsShortSavedMovies={setIsShortSavedMovies}
        />
      </div>
    </div>

  );
}

export default SearchForm;
