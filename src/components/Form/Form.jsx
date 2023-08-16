import React from 'react';
import './Form.css';


function Form({ formName, onSubmit, children, isLoading}) {

  return (
    <form
      className="popup__form form"
      name={formName}
      onSubmit={onSubmit}
    >
      {children}
      <button className="popup__button" type="submit" aria-label="Save">
        Зарегистрироваться
      </button>
    </form>
  );
}

export default Form;