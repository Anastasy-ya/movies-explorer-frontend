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
      // credentials: "include",
    }).then((res) => this._checkResponce(res));
  }
}

const moviesApi = new MoviesApi("https://api.nomoreparties.co/beatfilm-movies", {
  "Content-Type": "application/json",
});

export default moviesApi;