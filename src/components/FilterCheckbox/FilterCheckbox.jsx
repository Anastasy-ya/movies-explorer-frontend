import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox({ 
  setIsShortMovies, 
  isShortMovies,
  isShortSavedMovies,
  setIsShortSavedMovies,
}) { //, handleSubmit 

  function handleChange(e) {
    setIsShortMovies(!isShortMovies);
    setIsShortSavedMovies(!isShortSavedMovies);
  };

  return (
    <div className="search-input__tumbl">
      <label className="tumbl">
        <input
          type="checkbox"
          className="tumbl__checker"
          onChange={(e) => handleChange(e)}
          checked={isShortMovies}
        />
        <span className="tumbl__slider"
          aria-label="filter short films"></span>
      </label>
      <p className="search-input__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;