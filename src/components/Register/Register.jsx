import React from 'react';
import './Register.css';
import Logo from "../Logo/Logo";
import Form from "../Form/Form";

function Register(p) {

  //запишем данные таргета в соответствующие поля userData, неизмененные поля не меняем
  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setUserData({
  //     ...userData,
  //     [name]: value,
  //   });
  // }

  // //отправка данных в ф-ю, сделающую запрос на сервер
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   onSubmit(userData);
  // };

  // function handleChangeName(e) {
  //   setName(e.target.value);
  // }

  return (
    <div className="auth-container">
      <Logo />
      <h1 className="auth-container__wellcome">Добро пожаловать!</h1>
      <Form className="auth-container__form">
        <label className="form__label">
          <input
            type="text"
            name="name"
            className="form__input"
            placeholder="Вася Пупкин"
            required
            minLength="2"
            maxLength="40"
            id="form__name-input"
          // onChange={(e) => handleChangeName(e)}
          // value={name || ""}
          />
          <span className="form__input-error form__name-input-error"></span>
        </label>
        <label className="form__label">
          <input
            type="text"
            name="email"
            className="form__input form__input_type_black"
            placeholder="Email"
            required
            minLength="2"
            maxLength="40"
            id="form__email-input"
          // onChange={(e) => handleChange(e)}
          />
          <span className="form__input-error form__name-input-error"></span>
        </label>
        <label className="form__label">
          <input
            type="password"
            name="password"
            className="form__input form__input_type_black"
            placeholder="Пароль"
            required
            minLength="2"
            maxLength="200"
            id="form__password-input"
          // onChange={(e) => handleChange(e)}
          />
          <span className="form__input-error form__about-input-error"></span>
        </label>
      </Form>
    </div>
  );
}

export default Register;