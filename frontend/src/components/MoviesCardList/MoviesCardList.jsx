import React from 'react';
import './MoviesCardList.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import LearnMore from "../LearnMore/LearnMore";

function MoviesCardList(props) {
  // isMoviePage, movies, isLoggedIn, handleSaveMovie

  console.log(props.movies)
  return (
    <section className="card-list">

      <SearchForm />

      <ul className="card-list__size-container size-container">
        {props.movies.map((movie) => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            isMoviePage={props.isMoviePage}
            handleSaveMovie={(movie) => props.handleSaveMovie(movie)}
          />
        ))}

      </ul>

      <LearnMore />

    </section>
  );
}

export default MoviesCardList;