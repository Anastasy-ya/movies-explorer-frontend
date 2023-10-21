import React from "react";
import "../../blocks/popupStyle.css"

function RequestMessage({
  isOpenConfirmationPopup,
  requestMessage
}) {

  return (
    <>
      <div
        className={`confirmation-popup popup_type_success ${isOpenConfirmationPopup ?
          "confirmation-popup_opened" :
          ""
          }`}
      >
        <div className="confirmation-popup__container">
          <p className="confirmation-popup__message">{requestMessage}</p>
        </div>
      </div>
    </>
  );
}

export default RequestMessage;