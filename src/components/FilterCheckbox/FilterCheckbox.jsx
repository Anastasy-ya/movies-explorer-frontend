import React from 'react';
import './FilterCheckbox.css';



function FilterCheckbox() {
  return (
      <div className="search-input__tumbl">
        <label className="tumbl">
          <input type="checkbox" className="tumbl__checker" />
          <span className="tumbl__slider" aria-label="filter short films"></span>
        </label>
        <p className="search-input__text">Корометражки</p>
      </div>
  );
}

export default FilterCheckbox;