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
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResponce(res));
  }

  changeLikeCardStatus(_id, isLiked) {
    return fetch(`${this._baseUrl}/movies/${_id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResponce(res));
  }

}

const moviesApi = new MoviesApi("https://s.anastasy-ya.pet-project.nomoredomains.work", {
  "Content-Type": "application/json",
});

export default moviesApi;