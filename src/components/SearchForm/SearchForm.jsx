import React from 'react';
import './SearchForm.css';

function SearchForm({ placeholder, handleChange }) {
  return (
    <div className="search-form">
      <input
      type="text"
      className="input"
      placeholder={placeholder}
      onChange={handleChange}
    />
    </div>
    
  );
}

export default SearchForm;