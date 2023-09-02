import React from 'react';
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

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchMovie(values['search']);
    //тут сохранить в локал сторадж для каждого вида
    resetForm();
  };

  // console.log(values['search'])

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
            // value={values.search || "Фильм"}
            placeholder="Фильм"//{placeholder}
            onChange={handleChange}
            aria-label="write keywords for searching"
            required
          />

          <button
            className="search-input__button"
            aria-label="search films"
            disabled={!isValid}
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
        // movies={movies}
        // setIsShort={setIsShort}
        // isShort={isShort}
        />
      </div>
    </div>

  );
}

export default SearchForm;