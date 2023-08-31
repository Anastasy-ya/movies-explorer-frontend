import React, { useState, useEffect } from "react";
import './FilterCheckbox.css';

function FilterCheckbox({ setIsShortMovies, isShortMovies }) { //handlerChangeTumbler,

  // const [isChecked, setIsChecked] = useState(false);
  // const [isShortMovies, setIsShortMovies] = useState(false);

  // function handlerChangeTumbler(e) {
  //   console.log('сработала handlerChangeTumbler')
  //   // setIsShortMovies(!isShortMovies);
  //   if(isShortMovies) {
  //     setIsShortMovies(false)
  //   } else setIsShortMovies(true)
  // }
  // console.log(isShortMovies, 'isShortMovies');

  function handleChange(e) {
    setIsShortMovies(!isShortMovies);
    // if (isChecked) {
    //   setIsChecked(false);
    //   setIsShortMovies(false)
    // } else {
    //   setIsChecked(true);
    //   setIsShortMovies(true)
      
    // }

    // setIsShortSavedMovies(!isShortSavedMovies);
    // handlerChangeTumbler(e);
  }

  // useEffect((isShortMovies) => {
  //   if (isChecked) { 

  // }, [isShortMovies, movies]);

  console.log( isShortMovies, 'isShortMovies');

  return (
    <div className="search-input__tumbl">
      <label className="tumbl">
        <input
          type="checkbox" //radio
          className="tumbl__checker"//{`tumbl__checker ${isChecked && "checked"}`}//
          onChange={(e) => handleChange(e)}
        checked={isShortMovies}
        />
        <span className="tumbl__slider"//не по бэму
          // {`header__main ${isMainPage ? "header__main_type_turquoise" : ""}`}
          aria-label="filter short films"></span>
      </label>
      <p className="search-input__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;