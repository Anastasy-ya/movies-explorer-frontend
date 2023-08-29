import React from 'react';
import './Register.css';
import Logo from "../Logo/Logo";
import Form from "../Form/Form";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import useFormWithValidation from "../hooks/usevalidate";
import RequestMessage from "../RequestMessage/RequestMessage";

function Register({
  handleRegister,
  formName,
  className,
  buttonText,
  wellcomeText, //заголовок формы
  askToChangeForm, // предложение изменить форму ввода
  askToChangeFormLink,
  routTo,
  requestMessage
  // setCurrentUser,
  // currentUser
}) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  //отправка данных в ф-ю, сделающую запрос на сервер
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(values);
    resetForm();
  };
  // console.log('errors', errors);
  //   console.log('поля', values);

  return (
    <section className="auth-container">

      <Logo />
      <h1 className="auth-container__wellcome">{wellcomeText}</h1>

      <Form
        className={className}
        formName={formName}
        buttonText={buttonText}
        typeReg={true}
        isValid={isValid}
        onSubmit={(e) => handleSubmit(e)}
        >

        <Input
          type={"text"}
          name={"name"}
          minLength={"2"}
          maxLength={"40"}
          labelText={"Имя"}
          placeholder={"Введите имя"}
          // value={"Анастасия"}
          handleChange={(e) => handleChange(e)}
          errors={errors}
          values={values}
          pattern="[a-zA-Zа-яА-ЯёЁ\s\-]+"
        />

        <Input
          type={"text"}
          name={"email"}
          minLength={"2"}
          maxLength={"40"}
          labelText={"E-mail"}
          placeholder={"Введите E-mail"}
          // value={"mail@mail.com"}
          handleChange={(e) => handleChange(e)}
          errors={errors}
          values={values}
          pattern="^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$"
        />

        <Input
          type={"password"}
          name={"password"}
          minLength={"2"}
          maxLength={"20"}
          labelText={"Пароль"}
          placeholder={""}
          handleChange={(e) => handleChange(e)}
          errors={errors}
          values={values}
        />

        <RequestMessage
            requestMessage={requestMessage}
            parent={"profile"}
          />

      </Form>

      <div className="auth-container__link-container">
        <p className="auth-container__change-form-text">
          {askToChangeForm}
        </p>
        <Link
          to={routTo}
          className="auth-container__change-form-text auth-container__change-form-text_type_link"
          aria-label="login"
        >{askToChangeFormLink}</Link>
      </div>

    </section>
  );
}

export default Register;



