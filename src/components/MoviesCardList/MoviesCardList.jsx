import React from 'react';
import './MoviesCardList.css';

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    <section className="card-list">
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
          /><MoviesCard 
            isMoviePage={props.isMoviePage}
          />
    </ul>
    </section>
  );
}

export default MoviesCardList;