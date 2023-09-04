// import React, { useCallback, useState } from "react";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useCallback } from "react";

//хук управления формой и валидации формы
export function useFormWithValidation() {

  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  const handleChange = (event) => {

    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };
  return { values, handleChange, errors, isValid, resetForm, setErrors };
}

export default useFormWithValidation;