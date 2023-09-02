import React from 'react';
import './RequestMessage.css';

//уведомление о статусе запроса на сервер
function RequestMessage({ parent, requestMessage }) {
  return (
    <span className={`${parent}__request-message request-message_type_animated`}>
    {/*совершенно не понятно как здесь соблюсти БЭМ, я же не могу переменную передать в css */}
    {`${requestMessage}`}
    </span>
  );
}

export default RequestMessage;