class MainApi {
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

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResponce(res));
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      return this._checkResponce(res)
    });
  }

  setUserData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify(data),
    }).then((res) => this._checkResponce(res));
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify(data),
    }).then((res) => this._checkResponce(res));
  }

  saveAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._checkResponce(res));
  }

  //этот метод будет вызван в публичной функции index.js deleteCard
  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResponce(res));
  }

  addLike(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResponce(res));
  }

  removeLike(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResponce(res));
  }

  changeLikeCardStatus(_id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResponce(res));
  }

} //Api


const mainApi = new MainApi("https://api.anastasy-ya.diplom.nomoredomains.xyz", {
  "Content-Type": "application/json",
});

export default mainApi;