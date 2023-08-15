import React, { useState } from "react";
import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
// import Login from "./Login";
// import Register from "./Register";
// import InfoTooltip from "./InfoTooltip";
// import api from "../utils/Api";
// import EditProfilePopup from "./EditProfilePopup";
// import EditAvatarPopup from "./EditAvatarPopup";
// import AddPlacePopup from "./AddPlacePopup";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// import * as auth from "../utils/auth";

// import PopupWithConfirm from "./PopupWithConfirm";



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  
  
  
  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser || ""}>
          <Header isLoggedIn={isLoggedIn}/> 
          <main className="content">








           
            {/* <Main /> */}
          
          
          <Routes>
          
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
              path="/"
              element={
                <Main
                  isLoggedIn={isLoggedIn}
                  // element={Main}
                  // onEditProfile={handleEditProfileClick}
                  // onAddPlace={handleAddPlaceClick}
                  // onEditAvatar={handleEditAvatarClick}
                  // cards={cards}
                  // onCardLike={handleCardLike}
                  // onCardDelete={handleOpenConfirmationPopup} //удаляет handleCardDelete, а сюда подставим ф-ю открывающую попап
                  // onCardClick={handleCardClick}
                />
              }
              /> {/*конец роута Movies */}

              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    element={Movies}
                  // onEditProfile={handleEditProfileClick}
                  // onAddPlace={handleAddPlaceClick}
                  // onEditAvatar={handleEditAvatarClick}
                  // cards={cards}
                  // onCardLike={handleCardLike}
                  // onCardDelete={handleOpenConfirmationPopup} //удаляет handleCardDelete, а сюда подставим ф-ю открывающую попап
                  // onCardClick={handleCardClick}
                  />
                }
              /> {/*конец роута "/" */}
          </Routes>
          {/* <EditProfilePopup //редактирование имени польз
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
          </main>
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
