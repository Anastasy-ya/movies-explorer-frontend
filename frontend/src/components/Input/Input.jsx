
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
  handleChange,
  errors,
  pattern
 }) {
  
  return (
    <label className="form__label form__label_type_profile">
      {labelText}
      <input
        type={type}
        name={name}
        className="form__input"
        placeholder={placeholder}
        value={value}
        required
        minLength={minLength}
        maxLength={maxLength}
        id={`form__${name}-input`}
        pattern={pattern}
        onChange={(e) => handleChange(e)}
      />

      <span className="form__input-error">
        {errors?.[name]}
      </span>
    </label>
  );
}

export default Input;