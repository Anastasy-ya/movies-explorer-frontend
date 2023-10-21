import React, { useEffect } from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";




function MoviesCardList({
  isMoviePage,
  movies,
  isLoggedIn,
  handleSaveMovie,
  handleSearchMovie,
  requestMessage,
  handleDeleteMovie,
  openPopup
}) {

  // useEffect(() => {
  //   if (movies.length === 0) {
  //     openPopup("Ничего не найдено")
  //   }
  // }, [movies]);

  return (
    <section className="card-list">

      <ul className="card-list__size-container size-container">
        {movies.length > 0 && movies.map((movie, index) => (
          <li className="card" key={index}>
          <MoviesCard
            key={index}
            movie={movie}
            isMoviePage={isMoviePage}
            // handleSearchMovie={handleSearchMovie}
            // requestMessage={requestMessage}
            handleSaveMovie={handleSaveMovie} //попадает из movies
            handleDeleteMovie={handleDeleteMovie} //попадает из saved-movies
          />
          </li>
        ))}

      </ul>

    </section>
  );
}

export default MoviesCardList;