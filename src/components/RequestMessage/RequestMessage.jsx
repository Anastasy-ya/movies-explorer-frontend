// import React, { Children } from 'react';
// import './RequestMessage.css';

//уведомление о статусе запроса на сервер
// function RequestMessage({ parent, requestMessage, erroElem }) {
//   return (
//     <>
//       <span className={`${parent}__request-message request-message`}>
//         {requestMessage}
//       </span>
//       <div className={`${parent}__container container`}>
//         {erroElem}
//       </div>
//     </>
//   );
// }

// export default RequestMessage;


import React, { useEffect } from "react";
import "../../blocks/popupStyle.css"


//модуль для всех попапов. Представляет из себя окно попапа и кнопку закрытия
function RequestMessage({ 
  isOpenConfirmationPopup, 
  requestMessage, 
  setIsOpenConfirmationPopup 
}) {

 function onClose() {
  setIsOpenConfirmationPopup(false)
 }
  

  return (
    <>
      <div
        className={`confirmation-popup popup_type_success ${
          isOpenConfirmationPopup ? "confirmation-popup_opened" : ""
        }`}
      >
        <div className="confirmation-popup__container">
          <button
            className="confirmation-popup-close-icon"
            type="button"
            aria-label="Close"
            onClick={onClose}
          />
          <p className="confirmation-popup__message">{requestMessage}</p>
        </div>
      </div>
    </>
  );
}

export default RequestMessage;