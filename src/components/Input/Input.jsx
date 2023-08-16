import React from 'react';
import './Input.css';


function Input({ 
  type, 
  name, 
  minLength, 
  maxLength, 
  labelText, 
  placeholder }) {

  return (
    <label className="form__label">
      {labelText}
      <input
        type={type}
        name={name}
        className="form__input"
        placeholder={placeholder} //currentUser.name
        required
        minLength={minLength}
        maxLength={maxLength}
        id={`form__${name}-input`}
      // onChange={(e) => handleChangeName(e)}
      // value={name || ""} //currentUser.name
      />
      <span className="form__input-error form__name-input-error"></span>
    </label>
  );
}

export default Input;