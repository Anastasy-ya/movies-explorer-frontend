import React from 'react';
import './SearchForm.css';

function SearchForm({ placeholder, handleChange }) {
  return (
    <section className="search-input">

      <div className="search-input__box">
        <input
          type="text"
          className="search-input__field"
          placeholder={placeholder}
          onChange={handleChange}
        />
        <button className="search-input__button">Найти</button>
      </div>

      <div className="search-input__tumbl">
        <label class="tumbl">
          <input type="checkbox" />/
          <span class="tumbl__slider"></span>
        </label>
        <p className="search-input__text">Корометражки</p>
      </div>

    </section>
    
  );
}

export default SearchForm;