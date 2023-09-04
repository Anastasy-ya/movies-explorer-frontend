import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox({ setIsShortMovies, isShortMovies, handleSubmit }) { //handlerChangeTumbler,
// console.log(isShortMovies, 'isShortMovies')
  function handleChange(e) {
    setIsShortMovies(!isShortMovies);
    // handleSubmit(e); //
  };

  return (
    <div className="search-input__tumbl">
      <label className="tumbl">
        <input
          type="checkbox"
          className="tumbl__checker"//{`tumbl__checker ${isChecked && "checked"}`}//
          onChange={(e) => handleChange(e)}
          checked={isShortMovies} // && "checked"
        />
        <span className="tumbl__slider"
          aria-label="filter short films"></span>
      </label>
      <p className="search-input__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;