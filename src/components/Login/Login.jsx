import React from 'react';
import './Login.css';
import Logo from "../Logo/Logo";
import Form from "../Form/Form";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import useFormWithValidation from "../hooks/usevalidate";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Login({
  handleLogin,
  formName,
  buttonText,
  wellcomeText,
  askToChangeForm,
  askToChangeFormLink,
  routTo,
  openPopup,
  setIsLoggedIn
}) {

  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values)
      .then(() => {
      })
      .catch((err) => {
        console.log(err, 'authorization error')
        openPopup(err || "");
        setIsLoggedIn(false);
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
        onSubmit={(e) => handleSubmit(e)}
        disabled={!isValid}
      >
        <Input
          type={"text"}
          name={"email"}
          minLength={"2"}
          maxLength={"20"}
          labelText={"E-mail"}
          placeholder={"Enter E-mail"}
          value={values.email ?? currentUser.email}
          handleChange={(e) => handleChange(e)}
          errors={errors}
          values={values}
          pattern="^[a-zA-Z0-9_\-.]{1,}@[a-zA-Z0-9_\-.]{1,}\.[a-zA-Z]{2,5}$"
        />

        <Input
          type={"password"}
          name={"password"}
          minLength={"2"}
          maxLength={"20"}
          labelText={"Password"}
          placeholder={"Enter password"}
          handleChange={(e) => handleChange(e)}
          errors={errors}
          values={values}
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

export default Login;