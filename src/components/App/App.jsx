import React, { useState } from "react";
import './App.css';
import Header from "../Header/Header";
// import Main from "./Main";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
// import ImagePopup from "./ImagePopup";
// import Login from "./Login";
// import Register from "./Register";
// import InfoTooltip from "./InfoTooltip";
// import api from "../utils/Api";
// import EditProfilePopup from "./EditProfilePopup";
// import EditAvatarPopup from "./EditAvatarPopup";
// import AddPlacePopup from "./AddPlacePopup";
// import { ProtectedRoute } from "./ProtectedRoute";
// import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// import * as auth from "../utils/auth";

// import PopupWithConfirm from "./PopupWithConfirm";

function App() {
  
  return (
    <div className="root">
      <div className="page">
        {/* <CurrentUserContext.Provider value={currentUser || ""}> */}
          <Header /> 
          <SearchForm />
          {/*userEmail={userEmail} deleteToken={deleteToken} */}
          {/* <Routes>
            <Route
              path="*" //пользователь вошел на несуществующую страницу
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Navigate to="/sign-up" replace />
                )
              }
            />

            <Route
              path="/sign-up"
              element={
                <Register
                  onSubmit={handleRegister}
                  title={"Регистрация"}
                  formName={"sign-up"}
                  buttonName={"Зарегистрироваться"}
                  onclose={closeAllPopups}
                  isLoading={isLoading}
                />
              }
            />

            <Route
              path="/sign-in"
              element={
                <Login
                  onSubmit={handleLogin}
                  title={"Вход"}
                  formName={"sign-in"}
                  buttonName={"Войти"}
                  isLoading={isLoading}
                />
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleOpenConfirmationPopup} //удаляет handleCardDelete, а сюда подставим ф-ю открывающую попап
                  onCardClick={handleCardClick}
                />
              }
            />
          </Routes>
          <EditProfilePopup //редактирование имени польз
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup //добавление новой карточки
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <EditAvatarPopup //редактирование аватара
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <PopupWithConfirm 
            isOpen={isOpenConfirmationPopup}
            onClose={closeAllPopups}
            onConfirm={handleCardDelete}
            isLoading={isLoading}
          />
          <ImagePopup
            onClose={closeAllPopups}
            isOpen={isOpenImage}
            name={selectedCard.name}
            link={selectedCard.link}
          />
          <InfoTooltip
            isOpen={openInfoTooltip}
            formName={"success"}
            onClose={closeAllPopups}
            isEntry={isEntry}
            userMessage={userMessage}
          /> */}
          <Footer />
        {/* </CurrentUserContext.Provider> */}
      </div>
    </div>
  );
}

export default App;
