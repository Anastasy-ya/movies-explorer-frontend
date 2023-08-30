import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormWithValidation from "../hooks/usevalidate";
import RequestMessage from "../RequestMessage/RequestMessage";

function SearchForm({
  handleSearchMovie,
  requestMessage,
  movies
}) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchMovie(values['search']);
    resetForm();
  };

  console.log(values['search'])

  return (
    <div className="search-input">
      <div className="search-input__size-container size-container">

        <form className="search-input__form form">

          <input
            type="text"
            name="search"
            className="search-input__field"
            // value="Фильм"
            placeholder="Введите название фильма"//{placeholder}
            onChange={handleChange}
            aria-label="write keywords for searching"
            required
          />

          <button
            className="search-input__button"
            aria-label="search films"
            onSubmit={(e) => handleSubmit(e)}
            disabled={!isValid}
          >Найти
          </button>

          </form>

          <RequestMessage
            requestMessage={requestMessage}
            parent={"search-input"}
          />

        <FilterCheckbox 
          movies={movies}
        />
      </div>
    </div>

  );
}

export default SearchForm;