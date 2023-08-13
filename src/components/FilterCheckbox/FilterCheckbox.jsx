import React from 'react';
import './FilterCheckbox.css';



function FilterCheckbox() {
  return (
      <div className="search-input__tumbl">
        <label class="tumbl">
          <input type="checkbox" />
          <span class="tumbl__slider" aria-label="filter short films"></span>
        </label>
        <p className="search-input__text">Корометражки</p>
      </div>
  );
}

export default FilterCheckbox;