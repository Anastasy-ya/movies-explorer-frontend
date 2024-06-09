import React from 'react';
import './Register.css';
import Logo from "../Logo/Logo";
import Form from "../Form/Form";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import useFormWithValidation from "../hooks/usevalidate";

function Register({
  handleRegister,
  formName,
  buttonText,
  wellcomeText,
  askToChangeForm,
  askToChangeFormLink,
  routTo,
  openPopup
}) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  // sending data to a function that will make a request to the server
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(values)
      .catch((err) => {
        console.log(err)
        openPopup(err || "");
        resetForm();
      })
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
          labelText={"name"}
          placeholder={"Enter name"}
          value={values.name || ""}
          handleChange={(e) => handleChange(e)}
          errors={errors}
          pattern="[a-zA-Zа-яА-Я0-9ёЁ_\s\-]+"
        />

        <Input
          type={"text"}
          name={"email"}
          placeholder={"Enter E-mail"}
          value={values.email || ""}
          minLength={"2"}
          maxLength={"20"}
          labelText={"E-mail"}
          errors={errors}
          pattern="^[a-zA-Z0-9_\-.]{1,}@[a-zA-Z0-9_\-.]{1,}\.[a-zA-Z]{2,5}$"
          handleChange={(e) => handleChange(e)}
        />

        <Input
          type={"password"}
          name={"password"}
          minLength={"2"}
          maxLength={"20"}
          labelText={"Password"}
          placeholder={"Enter password"}
          value={values.password || ""}
          handleChange={(e) => handleChange(e)}
          errors={errors}
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



