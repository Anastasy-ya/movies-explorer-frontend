import React from 'react';
import './Form.css';

function Form({ 
  formName, 
  onSubmit, 
  children, 
  // isLoading, раскомментировать на 4 этапе
  buttonText}) {

  return (
    <form
      className="popup__form form"
      name={formName}
      onSubmit={onSubmit}
    >
      {children}
      <button className="form__button" type="submit" aria-label={formName}>
        {buttonText}
      </button>
    </form>
  );
}

export default Form;