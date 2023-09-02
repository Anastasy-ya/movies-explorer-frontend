import React, { useState, useEffect } from "react";
import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import useFormWithValidation from "../hooks/usevalidate";
import RequestMessage from "../RequestMessage/RequestMessage";


// const currentUser = { name: "Анастасия", email: "mail@mail.com" }

function Profile({
  isLoggedIn,
  routTo,
  handleChangeProfile,
  handleDeleteToken,
  requestMessage
}) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  // console.log('введено в поля', values)

  const currentUser = React.useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChangeProfile(values);
    resetForm();
  };

  // console.log(values);


  return (
    <section className="profile">
      <div className="profile__container">

        <h1 className="profile__wellcome">Привет, {currentUser.name}</h1>

        <form
          className="profile__form"
          name="profile"
          onSubmit={handleSubmit}
        >
          <label className="profile__label profile__label_type_grid1">
            Имя
          </label>
          <input
            type="text"
            name="name"
            className="
            profile__input 
            profile__input_type_grid2"
            placeholder="Введите имя"
            required
            minLength="2"
            maxLength="20"
            id="profile__profile-name-input"
            onChange={(e) => handleChange(e)}
            pattern="[a-zA-Zа-яА-ЯёЁ\s\-]+"
            value={values.name ?? currentUser.name}
          />
          <span className="profile__input-error">
            {errors["profile-name"] && "Имя: "}{errors?.["profile-name"]}
          </span>

          <label className="profile__label profile__label_type_grid3">
            E-mail
          </label>
          <input
            type="text"
            name="email"
            className="
            profile__input 
            profile__input_type_grid4"
            placeholder="Введите E-mail"
            required
            minLength="2"
            maxLength="20"
            id="profile__profile-email-input`"
            onChange={(e) => handleChange(e)}
            pattern="^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$"
            value={values.email ?? currentUser.email}
          />
          <span className="profile__input-error profile__input-error_type_bottom">
            {errors["profile-email"] && "E-mail: "}{errors?.["profile-email"]}
          </span>

          <RequestMessage
            requestMessage={requestMessage}
            parent={"profile"}
          />

          <button
            className="profile__change-data"
            type="submit"
            aria-label="change data"
            disabled={!isValid}
          >
            Редактировать
          </button>
        </form>

        <Link
          to={routTo}
          aria-label="logout"
          onClick={handleDeleteToken}
          className="profile__change-data profile__change-data_type_link"
          /*поправить нижний отступ */
        >
          <p className="profile__change-data profile__change-data_type_link">
            Выйти из аккаунта
          </p></Link>

      </div>
    </section>
  );
}

export default Profile;
