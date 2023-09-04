import { API_URL, MOVIES_URL } from "../utils/consts";

function checkResponce(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getInitialMovies() {
  return fetch(`${API_URL}/movies`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => checkResponce(res)
  );
}

export function saveMovie(movie) {

  const newMovie = {
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: MOVIES_URL + movie.image.url,
    trailerLink: movie.trailerLink,
    thumbnail: MOVIES_URL + movie.image.formats.thumbnail.url,
    movieId: String(movie.id),
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
  }
  return fetch(`${API_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(newMovie),
  }).then((res) => checkResponce(res));
}

export function deleteCard(_id) {
  return fetch(`${API_URL}/movies/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => checkResponce(res));
}





















// import {API_URL} from "../utils/consts"; //проверить фиг скобки

// class MainApi {
//   constructor( baseUrl ) {
//     this._baseUrl = baseUrl;
//     // this._headers = headers;
//   }

//   _checkResponce(res) {
//     if (res.ok) {
//       // console.log(res.json());
//       return res.json();
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
//   }

//   saveMovie(data) {
//     return fetch(`${this._baseUrl}/movies`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify(data),
//     }).then((res) => this._checkResponce(res));
//   }

//   getInitialMovies() {
//     return fetch(`${this._baseUrl}/movies`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     }).then((res) => this._checkResponce(res)
//     );
//   }

//   //этот метод будет вызван в публичной функции index.js deleteCard
//   deleteCard(_id) {
//     return fetch(`${this._baseUrl}/cards/${_id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     }).then((res) => this._checkResponce(res));
//   }

//   // addLike(_id) {
//   //   return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
//   //     method: "PUT",
//   //     headers: this._headers,
//   //     credentials: "include",
//   //   }).then((res) => this._checkResponce(res));
//   // }

//   // removeLike(_id) {
//   //   return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
//   //     method: "DELETE",
//   //     headers: this._headers,
//   //     credentials: "include",
//   //   }).then((res) => this._checkResponce(res));
//   // }

//   // changeLikeCardStatus(_id, isLiked) {
//   //   return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
//   //     method: isLiked ? "DELETE" : "PUT",
//   //     headers: this._headers,
//   //     credentials: "include",
//   //   }).then((res) => this._checkResponce(res));
//   // }

// } //Api


// const mainApi = new MainApi(API_URL);

// export default mainApi;