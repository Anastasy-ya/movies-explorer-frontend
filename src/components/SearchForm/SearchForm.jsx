import React from 'react';
import './SearchForm.css';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ placeholder, handleChange }) {
  return (
    <section className="search-input">
      <div className="search-input__size-container size-container">
        <div className="search-input__box">
            <input
              type="text"
              className="search-input__field"
              placeholder="Фильм"//{placeholder}
              onChange={handleChange}
              aria-label="write key words for searching"
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