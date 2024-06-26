import React from "react";
import './FilterCheckbox.css';
import { useLocation } from "react-router-dom";

function FilterCheckbox({ 
  setIsShortMovies, 
  isShortMovies,
  isShortSavedMovies,
  setIsShortSavedMovies,
}) {

  const location = useLocation();

  function handleChange(e) {
  if (location.pathname === "/movies") {
    localStorage.setItem("isShortMovies", JSON.stringify(!isShortMovies));
    return setIsShortMovies(!isShortMovies);
  } else {
    localStorage.setItem("isShortSavedMovies", JSON.stringify(!isShortSavedMovies));
    return setIsShortSavedMovies(!isShortSavedMovies);
  }
}

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
          tabIndex="0"
          aria-label="filter short films"></span>
      </label>
      <p className="search-input__text">Short films</p>
    </div>
  );
}

export default FilterCheckbox;