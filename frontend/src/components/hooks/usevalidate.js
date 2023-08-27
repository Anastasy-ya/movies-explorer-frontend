// import React, { useCallback, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useState, useCallback } from "react";
// //хук управления формой
// export function useForm() {
//   const [values, setValues] = React.useState({});

//   const handleChange = (event) => {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;
//     setValues({...values, [name]: value});
//   };

//   return {values, handleChange, setValues};
// }



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

    // const namePattern = new RegExp(/^[a-zA-Zа-яА-Я0-9 -]+$/u);
    // const emailPattern = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/);

    // //если поле name не соответствует паттерну
    // if (event.target.name === "name" &&
    //   (!namePattern.test(String(values.name || "")))) {
    //   //создать сообщение об ошибке
    //   setErrors({ ...errors, 'name': 'Некорректное имя' })
    // } 
    // else if (event.target.name === "email" &&
    //   (!emailPattern.test(String(values.email || "")))) {
    //   setErrors({ ...errors, 'email': 'Некорректный E-mail' })
    // } 
    // else {
    //   //остальным полям и в остальных случаях оставить сообщение об ошибке, 
    //   //созданное на основе условий разметки
      setErrors({ ...errors, [name]: target.validationMessage });
    // };

    setIsValid(target.closest("form").checkValidity());
  };

 

  return { values, handleChange, errors, isValid, resetForm };
}

export default useFormWithValidation;