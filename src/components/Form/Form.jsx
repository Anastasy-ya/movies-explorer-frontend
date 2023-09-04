import React from 'react';
import './Form.css';

function Form({
  formName,
  onSubmit,
  children,
  buttonText,
  typeReg,
  disabled }) {

  return (
    <form
      className="form"
      name={formName}
      onSubmit={onSubmit}
    >
      {children}
      <button 
        className={`form__button ${typeReg && "form__button_type_reg"}`}
        type="submit" 
        aria-label={formName}
        disabled={disabled}
      >        
        {buttonText}
      </button>
    </form>
  );
}

export default Form;