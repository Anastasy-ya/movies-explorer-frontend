import React from 'react';
import './MoviesCardList.css';

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <section className="card-list">
      <ul className="card-list__size-container size-container">
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
    </ul>
    </section>
  );
}

export default MoviesCardList;