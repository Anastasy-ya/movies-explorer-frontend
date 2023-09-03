import React from 'react';
import './RequestMessage.css';

//уведомление о статусе запроса на сервер
function RequestMessage({ parent, requestMessage }) {
  return (
    <span className={`${parent}__request-message request-message`}>
    {requestMessage}
    </span>
  );
}

export default RequestMessage;