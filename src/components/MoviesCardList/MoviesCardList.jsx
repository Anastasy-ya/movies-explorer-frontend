import React from 'react';
import './MoviesCardList.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import LearnMore from "../LearnMore/LearnMore";

function MoviesCardList(props) {
  return (
    <section className="card-list">

      <SearchForm />

      <ul className="card-list__size-container size-container">
        <MoviesCard
          isMoviePage={props.isMoviePage}
        /><MoviesCard
          isMoviePage={props.isMoviePage}
        /><MoviesCard
          isMoviePage={props.isMoviePage}
        /><MoviesCard
          isMoviePage={props.isMoviePage}
        /><MoviesCard
          isMoviePage={props.isMoviePage}
        /><MoviesCard
          isMoviePage={props.isMoviePage}
        />
        <MoviesCard
          isMoviePage={props.isMoviePage}
        /><MoviesCard
          isMoviePage={props.isMoviePage}
        /><MoviesCard
          isMoviePage={props.isMoviePage}
        /><MoviesCard
          isMoviePage={props.isMoviePage}
        /><MoviesCard
          isMoviePage={props.isMoviePage}
        /><MoviesCard
          isMoviePage={props.isMoviePage}
        />
      </ul>

      <LearnMore />

    </section>
  );
}

export default MoviesCardList;