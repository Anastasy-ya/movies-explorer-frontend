import React, { useState, useEffect } from "react";
import './MoviesCardList.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList({
  isMoviePage,
  movies,
  //здесь и movies для страницы movies и saved-movies для соответствующей страницы
  isLoggedIn,
  handleSaveMovie,
  handleSearchMovie,
  requestMessage, }) {

  // const [isShort, setIsShort] = React.useState(false);
  // console.log('movies', movies, 'isShort', isShort);

  // useEffect((isShort) => {
  //   console.log('сработал юзэффект')
  //   if (isShort) { // && movies.length > 0
  //     const films = movies.filter((film) => film.duration <= 40)
      
  //     movies = films;
  //     console.log(films, 'итоговое значение фильтрации')
  //   }
  // }, [isShort]);

  // function isSavedMovie(movie) {
  //   return savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId);
  // }


  // const films = allMovies.filter((movie) => {
  //   return (
  //   movie.nameRU.toLowerCase().includes(string.toLowerCase())
  //   )
  // })
  // setMovies(films);



  return (
    <section className="card-list">

      

      <ul className="card-list__size-container size-container">
        {movies.map((movie) => (

          <MoviesCard
            key={movie.id}
            movie={movie}
            isMoviePage={isMoviePage}
            handleSearchMovie={handleSearchMovie}
            requestMessage={requestMessage}
            // isSavedMovie={isSavedMovie}
          />

        ))}

      </ul>


    </section>
  );
}

export default MoviesCardList;