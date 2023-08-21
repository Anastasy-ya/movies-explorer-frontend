import React from 'react';
import './Form.css';

function Form({
  formName,
  onSubmit,
  children,
  // isLoading, раскомментировать на 4 этапе
  buttonText,
  typeReg }) {

  return (
    <form
      className="form" /*popup__form  */
      name={formName}
      onSubmit={onSubmit}
    >
      {children}
      <button 
        className={`form__button ${typeReg && "form__button_type_reg"}`}
        type="submit" 
        aria-label={formName}>
        {buttonText}
      </button>
    </form>
  );
}

export default Form;