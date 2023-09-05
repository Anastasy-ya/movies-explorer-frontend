import React, { Children } from 'react';
import './RequestMessage.css';

//уведомление о статусе запроса на сервер
function RequestMessage({ parent, requestMessage, erroElem }) {
  return (
    <>
      <span className={`${parent}__request-message request-message`}>
        {requestMessage}
      </span>
      <div className={`${parent}__container container`}>
        {erroElem}
      </div>
    </>
  );
}

export default RequestMessage;