import { MOVIES_API } from "../utils/consts";

  function checkResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  export function getMovies() {
    return fetch(`${MOVIES_API}`, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => checkResponce(res));
  };


// const moviesApi = new MoviesApi(MOVIES_API, {
//   "Content-Type": "application/json",
// });

// export default moviesApi;