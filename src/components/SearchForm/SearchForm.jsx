import React, { useState, useEffect } from "react";
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
// import useFormWithValidation from "../hooks/usevalidate";
import RequestMessage from "../RequestMessage/RequestMessage";
import AuthForm from "../AuthForm/AuthForm";
import { ErrorMessage } from "@hookform/error-message";
import { useLocation } from "react-router-dom";

function SearchForm({
  handleSearchMovie,
  requestMessage,
  setRequestMessage,
  setIsShortMovies,
  isShortMovies,
  onSearch,
  setQuery,
  setSavedQuery,
  onSavedSearch
}) {

  // const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);
  const { register, errors, isValid, handleSubmit, watch, setValue } = AuthForm();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/movies") {
      //   const savedQuery = localStorage.getItem("moviesSearchQuery");
      // if (savedQuery) {
      setValue("search", localStorage.getItem("moviesSearchQuery") || ""); //динамические значения полей
      //   }
    } else {
      //   const savedQuery = localStorage.getItem("savedMoviesSearchQuery");
      //   if (savedQuery) {
      setValue("search", localStorage.getItem("savedMoviesSearchQuery"|| ""));
      //   }
    }
  }, []);

  console.log(location.pathname)

  const onSubmit = (data) => {
    if (location.pathname === "/movies") {
      onSearch(data.search);
    }else{
      onSavedSearch(data.search);
    }
  };

  const savedQuery = watch("search", localStorage.getItem("savedMoviesSearchQuery") || "");
  const query = watch("search", localStorage.getItem("moviesSearchQuery") || "");

  useEffect(() => {
    if (location.pathname === "/movies") {
      localStorage.setItem("moviesSearchQuery", query);
      setQuery(query);
    } else {
      localStorage.setItem("savedMoviesSearchQuery", savedQuery);
      setSavedQuery(savedQuery);
    }
  }, [query, savedQuery]);



  return (
    <div className="search-input">
      <div className="search-input__size-container size-container">

        <form
          className="search-input__form form"
          onSubmit={handleSubmit(onSubmit)}
        >

          <input
            type="text"
            name="search"
            className="search-input__field"
            placeholder="Фильм"
            aria-label="write keywords for searching"
            {...register("search", {
              required: "Нужно ввести ключевое слово",
            })}
          />

          <button
            type="submit"
            className="search-input__button"
            aria-label="search films"
          >Найти
          </button>

          {/*TODO: добавить еще один пропс в остальные элеементы */}
          {<RequestMessage
            requestMessage={requestMessage}
            parent={"search-input"}
            oneMoreElement={<ErrorMessage errors={errors} name="search" />}
          />}

        </form>

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
