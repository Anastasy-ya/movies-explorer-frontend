import React from 'react';
import './RequestMessage.css';

//уведомление о статусе запроса на сервер
function RequestMessage({ parent, requestMessage, oneMoreElement }) {
  return (
    <>
      <span className={`${parent}__request-message request-message`}>
        {requestMessage}
      </span>
      <div className={`${parent}__container container`}>
        {oneMoreElement}
      </div>
    </>
  );
}

export default RequestMessage;