import React from 'react';
import './Profile.css';
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Logo from "../Logo/Logo";
import Form from "../Form/Form";
import { Link } from "react-router-dom";
import Input from "../Input/Input";

const currentUser = {name: "Анастасия", email: "mail@mail.com"}

function Profile(props) {
  //currentUser.name currentUser.email
  return (
    <section className="profile">
      {/* <div className="signup signup__auth-container"> */}
      <div className="profile-container ">


        <h1 className="profile__wellcome">Привет, {currentUser.name}</h1>

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
            type={"text"}
            name={"email"}
            minLength={"2"}
            maxLength={"40"}
            labelText={"E-mail"}
            placeholder={"mail@mail.com"}
          />

        </Form>
        <p className="profile__change-data">
          Редактировать
          <Link
            to={props.routTo}
            className="profile__change-data profile__change-data_type_link"
            aria-label=""
          >Выйти из аккаунта</Link>
        </p>

      {/* </div> */}
    </div>
    </section>
  );
}

export default Profile;
