import { MOVIES_API } from "../utils/consts";
class MoviesApi {
  constructor( baseUrl, headers ) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      headers: this._headers,
    }).then((res) => this._checkResponce(res));
  }
}

const moviesApi = new MoviesApi(MOVIES_API, {
  "Content-Type": "application/json",
});

export default moviesApi;