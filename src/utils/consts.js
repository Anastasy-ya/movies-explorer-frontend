export const BASE_URL = "http://localhost:3000";
export const MOVIES_URL = "https://api.nomoreparties.co";
export const API_URL = "http://localhost:3000" // "http://localhost:3000"; "https://api.anastasy-ya.diplom.nomoredomains.xyz"
export const MOVIES_API = "https://api.nomoreparties.co/beatfilm-movies";



const MESSAGES = {
  ValidationError: 'Вы ввели неправильный логин или пароль', //400
  JsonWebTokenError: 'Пользователь не найден', //401
  ConflictError: 'Пользователь с таким email уже существует',//409
  InternalServerError: 'На сервере произошла ошибка', //500
  NotFound: 'Страница по указанному маршруту не найдена', // 404 

};


export default MESSAGES;