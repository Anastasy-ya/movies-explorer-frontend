import React from 'react';
import './SearchForm.css';

function SearchForm({ placeholder, handleChange }) {
  return (
    <div className="search-input">
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
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
        <p className="search-input__text">Корометражки</p>
      </div>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="36" height="20" viewBox="0 0 36 20" fill="none">
      <rect width="36" height="20" rx="10" fill="#3DDC84"/>
      <circle cx="26" cy="10" r="8" fill="white"/>
      </svg> */}
    </div>
    
  );
}

export default SearchForm;