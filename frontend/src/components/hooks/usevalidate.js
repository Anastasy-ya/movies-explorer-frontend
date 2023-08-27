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

  // const [values, setValues] = React.useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // }); //это временный костыль
  // const currentUser = React.useContext(CurrentUserContext);
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});

    

    const namePattern = /^[a-zA-Zа-яА-Я0-9 -]+$/u;
    if (!namePattern.test(String(values.name || ""))) {
        setErrors({...errors, 'name': 'Некорректное имя'})
    } 
    else {
      setErrors({...errors, 'name': target.validationMessage });
    };

    const emailPattern = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/;
    // const emailPattern = /^[a-zA-Zа-яА-Я0-9 -]+$/u;
    if (!emailPattern.test(String(values.email || ""))) {
        setErrors({...errors, 'email': 'Некорректный E-mail'})
    } 
    else {
      setErrors({...errors, 'email': target.validationMessage });
    };


    console.log(errors);
    console.log('поля', values);
    
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  // console.log(errors);

  // const namePattern = "[а-яА-Яa-zA-ZЁё\-\s]*$";
  // const emailPattern = "([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*@([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*[\.]([A-zА-я])+";
  // const passwordPattern = "[0-9а-яА-Яa-zA-ZЁё\-\s]*$";
  
  // const emailHandler = (e) => {
  //   console.log(!emailPattern.test(String(e.target.value).toLowerCase()));
  //   if (!emailPattern.test(String(e.target.value).toLowerCase())) {
  //     setErrors({...errors, [name]: 'Некорректный E-mail'})
  //   }
  // }




  return { values, handleChange, errors, isValid, resetForm };
}

export default useFormWithValidation;