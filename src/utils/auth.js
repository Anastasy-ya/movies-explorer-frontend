import { API_URL } from "../utils/consts";
// export const baseUrl = API_URL;

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({ name, email, password }) => {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    return checkResponse(res);
  });
};

export const login = ({ email, password }) => {
  return fetch(`${API_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const checkToken = () => {
  return fetch(`${API_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checkResponse(res);
  });
};

export const updateUser = ({ name, email }) => {
  return fetch(`${API_URL}/users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${localStorage.getItem("jwt")}`, //?
    },
    body: JSON.stringify({
      name, email
    }),
  }).then((res) => {

    return checkResponse(res);
  });
};

export const logOut = () => {
  return fetch(`${API_URL}/signout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponse(res));
};

