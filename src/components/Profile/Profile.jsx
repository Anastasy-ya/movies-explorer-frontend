import React, {useState} from "react";
import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import useFormWithValidation from "../hooks/usevalidate";

function Profile({
  // isLoggedIn,
  routTo,
  handleChangeProfile,
  handleDeleteToken,
  // requestMessage
}) {

  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const currentUser = React.useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChangeProfile(values);
    //обнулять форму не требуется
  };


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
            pattern="^[a-zA-Z0-9\-.]{1,}@[a-zA-Z0-9\-.]{1,}\.[a-zA-Z]{2,5}$"
            //валидация при помощи validate на бэке не принимает нижнее подчеркивание, TODO после сдачи
            //"^[a-zA-Z0-9_\-.]{1,}@[a-zA-Z0-9_\-.]{1,}\.[a-zA-Z]{2,5}$"
            value={values.email ?? currentUser.email}
          />
          <span className="profile__input-error profile__input-error_type_bottom">
            {errors["profile-email"] && "E-mail: "}{errors?.["profile-email"]}
          </span>

          <button
            className="profile__change-data"
            type="submit"
            aria-label="change data"
            disabled={!isValid || currentUser.name === values.name || currentUser.email === values.email}

          >
            Редактировать
          </button>
        </form>

        <Link
          to={routTo}
          aria-label="logout"
          onClick={handleDeleteToken}
          className="profile__change-data profile__change-data_type_link"
        >
          <p className="profile__change-data profile__change-data_type_link">
            Выйти из аккаунта
          </p></Link>

      </div>
    </section>
  );
}

export default Profile;
