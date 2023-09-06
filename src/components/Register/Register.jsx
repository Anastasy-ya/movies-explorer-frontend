import React from 'react';
import './Register.css';
import Logo from "../Logo/Logo";
import Form from "../Form/Form";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import useFormWithValidation from "../hooks/usevalidate";
import RequestMessage from "../RequestMessage/RequestMessage";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Register({
  handleRegister,
  formName,
  buttonText,
  wellcomeText, //заголовок формы
  askToChangeForm, // предложение изменить форму ввода
  askToChangeFormLink,
  routTo,
  requestMessage,
  setRequestMessage,
  setIsOpenConfirmationPopup
}) {

  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();


  //отправка данных в ф-ю, сделающую запрос на сервер
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(values)
    // .then(() => {
    // })
    .catch((err) => {
      console.log(err)
      setRequestMessage(err || "");
      setIsOpenConfirmationPopup(true);
      resetForm();
    })
    .finally(() => {
    });
  };


  return (
    <section className="auth-container">

      <Logo />
      <h1 className="auth-container__wellcome">{wellcomeText}</h1>

      <Form
        formName={formName}
        buttonText={buttonText}
        typeReg={true}
        onSubmit={(e) => handleSubmit(e)}
        disabled={!isValid}
      >

        <Input
          type={"text"}
          name={"name"}
          minLength={"2"}
          maxLength={"20"}
          labelText={"Имя"}
          placeholder={"Введите имя"}
          value={values.name ?? currentUser.name}
          handleChange={(e) => handleChange(e)}
          errors={errors}
          pattern="[a-zA-Zа-яА-ЯёЁ\s\-]+"
        />

        <Input
          type={"text"}
          name={"email"}
          minLength={"2"}
          maxLength={"20"}
          labelText={"E-mail"}
          placeholder={"Введите E-mail"}
          value={values.email ?? currentUser.email}
          handleChange={(e) => handleChange(e)}
          errors={errors}
          pattern="^[a-zA-Z0-9\-.]{1,}@[a-zA-Z0-9\-.]{1,}\.[a-zA-Z]{2,5}$"
          //валидация при помощи validate на бэке не принимает нижнее подчеркивание, TODO после сдачи
            //"^[a-zA-Z0-9_\-.]{1,}@[a-zA-Z0-9_\-.]{1,}\.[a-zA-Z]{2,5}$"
        />

        <Input
          type={"password"}
          name={"password"}
          minLength={"2"}
          maxLength={"20"}
          labelText={"Пароль"}
          placeholder={"Введите пароль"}
          value={values.password ?? currentUser.password}
          handleChange={(e) => handleChange(e)}
          errors={errors}
        />

        {/* <RequestMessage
          parent={"auth-container"}
          requestMessage={requestMessage}
          erroElem={""}
        /> */}


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



