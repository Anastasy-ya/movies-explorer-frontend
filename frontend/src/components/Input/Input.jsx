import React from 'react';
import './Input.css';


function Input({
  type,
  name,
  minLength,
  maxLength,
  labelText,
  placeholder,
  value,
  handleChange }) {

    

  return (
    <label className="form__label form__label_type_profile">
      {labelText}
      <input
        type={type}
        name={name}
        className="form__input"
        placeholder={placeholder} //currentUser.name
        // value={value || ""} //currentUser.name
        required
        minLength={minLength}
        maxLength={maxLength}
        id={`form__${name}-input`}
        onChange={(e) => handleChange(e)}
      />
      <span className="form__input-error form__name-input-error"></span>
    </label>
  );
}

export default Input;