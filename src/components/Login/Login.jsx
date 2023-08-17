import React from 'react';
import './Login.css';
import Logo from "../Logo/Logo";
import Form from "../Form/Form";
import { Link } from "react-router-dom";
import Input from "../Input/Input"

function Login(props) {

  return (
    <div className="signup signup__auth-container">
      <div className="auth-container">

        <Logo/>
        <h1 className="auth-container__wellcome">{props.wellcomeText}</h1>

        <Form
          className={props.className}
          formName={props.formName}
          onSubmit={props.onSubmit}
          // isLoading={props.isLoading} раскомментировать на 4 этапе
          buttonText={props.buttonText}>

          <Input
            type={"text"}
            name={"name"}
            minLength={"2"}
            maxLength={"40"}
            labelText={"Имя"}
            placeholder={"Анастасия"}
          />

          <Input
            type={"password"}
            name={"password"}
            minLength={"2"}
            maxLength={"20"}
            labelText={"Пароль"}
            placeholder={""}
          />

        </Form>
        <p className="auth-container__change-form-text">
          {props.askToChangeForm}
          <Link
            to={props.routTo}
            className="auth-container__change-form-text auth-container__change-form-text_type_link"
            aria-label=""
          >{props.askToChangeFormLink}</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;