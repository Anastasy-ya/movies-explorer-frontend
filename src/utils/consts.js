// export const BASE_URL = "http://localhost:3000";
export const MOVIES_URL = "https://api.nomoreparties.co";
export const API_URL = "api.anastasy-ya.diplom.nomoredomains.xyz" // "http://localhost:3000"; "api.anastasy-ya.diplom.nomoredomains.xyz"
export const MOVIES_API = "https://api.nomoreparties.co/beatfilm-movies";



const MESSAGES = {
  ValidationError: 'You entered an incorrect username or password', //400
  JsonWebTokenError: 'User is not found', //401
  ConflictError: 'User already existПользователь с таким email уже существует',//409
  InternalServerError: 'An error occurred on the server', //500
  NotFound: 'Page is not found', // 404 

};


export default MESSAGES;