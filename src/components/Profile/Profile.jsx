import React from 'react';
import './Profile.css';
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";

const currentUser = { name: "Анастасия", email: "mail@mail.com" }

function Profile(props) {
  //currentUser.name currentUser.email
  return (
    <section className="profile">
      <div className="profile-container ">

        <h1 className="profile__wellcome">Привет, {currentUser.name}</h1>

        <form
          className="profile__form profile-form"
          name="profile"
        // onSubmit={onSubmit}
        >
          <label className="profile-form__label label_type_grid1">
            Имя
          </label>
          <input
            type="text"
            name="profile-name"
            className="
            profile__form 
            profile-form__input 
            profile-form__input_type_grid2"
            placeholder="Анастасия" //currentUser.name
            required
            minLength="2"
            maxLength="20"
            id="profile__profile-name-input"
          // onChange={(e) => handleChangeName(e)}
          // value={name || ""} //currentUser.name
          />

          <label className="profile-form__label label_type_grid3">
            E-mail
          </label>
          <input
            type="text"
            name="profile-email"
            className="
            profile__form 
            profile-form__input 
            profile-form__input_type_grid4"
            placeholder="mail@mail.com" //currentUser.name
            required
            minLength="2"
            maxLength="20"
            id="profile__profile-email-input`"
          // onChange={(e) => handleChangeName(e)}
          // value={name || ""} //currentUser.name
          />

          <button className="profile__change-data" type="submit" aria-label="change data">
            Редактировать
          </button>
        </form>

        <Link
          to={props.routTo}
          aria-label="logout"
        >
          <p className="profile__change-data profile__change-data_type_link">
          Выйти из аккаунта
          </p></Link>

      </div>
    </section>
  );
}

export default Profile;
