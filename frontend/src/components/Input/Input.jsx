
import React from 'react'; /*, {useState, useCallback, useEffect} */
import './Input.css';

function Input({
  type,
  name,
  minLength,
  maxLength,
  labelText,
  placeholder,
  value, //временная заглушка
  handleChange,
  errors,
  currentUser //значения полей
 }) {

  // function takePattern(name) {
  //   switch (name) {
  //     case "name":
  //       return '[а-яА-Яa-zA-ZЁё\-\s]*$';
  //     case "email":
  //       return "([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*@([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*[\.]([A-zА-я])+";
  //     case "password":
  //       return '[0-9а-яА-Яa-zA-ZЁё\-\s]*$';
  //       default: return "";
  //   }
  // }; //

  // let a = takePattern("name");

  // console.log(a)

  // function getPattern() {
  //   if (name === "name") {
  //     return "[а-яА-Яa-zA-ZЁё\-\s]*$";
  //   } else if (name === "email") {
  //     return "([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*@([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*[\.]([A-zА-я])+";
  //   } else if (name === "password") {
  //     return "[0-9а-яА-Яa-zA-ZЁё\-\s]*$";
  //   }
  // };

  
  return (
    <label className="form__label form__label_type_profile">
      {labelText}
      <input
        type={type}
        name={name}
        className="form__input"
        placeholder={placeholder} //currentUser.name
        // value={currentUser?.[name] || ""} //currentUser.name currentUser?.[name]
        required
        minLength={minLength}
        maxLength={maxLength}
        id={`form__${name}-input`}
        // pattern="[а-яА-Яa-zA-ZЁё\-\s]*$"
        // pattern={
        //   name === "name" ?
        //   namePattern : 
        //   name === "email" ? 
        //   emailPattern :
        //   name === "password" ?
        //   passwordPattern : ""
        //   }
        // {
        //   (name === "name" && "[а-яА-Яa-zA-ZЁё\-\s]*$") 
        //   || (name === "email" && "([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*@([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*[\.]([A-zА-я])+")
        //   || (name === "password" && "[0-9а-яА-Яa-zA-ZЁё\-\s]*$")
        // }
        // pattern={(() => {
        //   if (name === "name") {
        //     return "[а-яА-Яa-zA-ZЁё\-\s]*$";
        //   } else if (name === "email") {
        //     return "([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*@([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*[\.]([A-zА-я])+";
        //   } else if (name === "password") {
        //     return "[0-9а-яА-Яa-zA-ZЁё\-\s]*$";
        //   }
        // })()}

        // {
        //   () => {
        //   if (name === "name") {
        //     return pattern="[а-яА-Яa-zA-ZЁё\-\s]*$";
        //   } else if (name === "email") {
        //     return pattern="([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*@([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*[\.]([A-zА-я])+";
        //   } else (name === "password") {
        //     return pattern="[0-9а-яА-Яa-zA-ZЁё\-\s]*$";
        //   }
        //   }
        // }

        // pattern="[а-яА-Яa-zA-ZЁё\-\s]*$"
        onChange={(e) => handleChange(e)}
        
        // {takePattern(name)}
        
        
      />

      <span className={`form__input-error form__${name}-input-error`}>
        {/* {JSON.stringify(errors?.[name])} */}
        {errors?.[name]}
      </span>
    </label>
  );
}

export default Input;



// import React from 'react';
// import './Input.css';

// function Input({
//   type,
//   name,
//   minLength,
//   maxLength,
//   labelText,
//   placeholder,
//   value,
//   handleChange }) {


//   return (
//     <label className="form__label form__label_type_profile">
//       {labelText}
//       <input
//         type={type}
//         name={name}
//         className="form__input"
//         placeholder={placeholder} //currentUser.name
//         // value={value || ""} //currentUser.name
//         required
//         minLength={minLength}
//         maxLength={maxLength}
//         id={`form__${name}-input`}
//         onChange={(e) => handleChange(e)}
//       />
//       <span className="form__input-error form__name-input-error"></span>
//     </label>
//   );
// }

// export default Input;