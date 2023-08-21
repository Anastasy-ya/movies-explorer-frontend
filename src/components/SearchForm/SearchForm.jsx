import React from 'react';
import './SearchForm.css';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ handleChange }) {

  function handleChange() {
    console.log('изменение значения инпута поиска фильмов')
  }

  return (
    <section className="search-input">
      <div className="search-input__size-container size-container">
        <div className="search-input__box">
            <input
              type="text"
              className="search-input__field"
              value="Фильм"
              placeholder="Введите название фильма"//{placeholder}
              onChange={handleChange}
              aria-label="write keywords for searching"
              required
            />
            
            <button
              className="search-input__button"
              aria-label="search films"
            >Найти</button>
        </div>
        <FilterCheckbox />
      </div>
    </section>

  );
}

export default SearchForm;