import React from 'react';
import './MoviesCardList.css';

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <section className="card-list">
      <ul className="card-list__size-container size-container">
        {/* <ul> */}
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        {/* </ul> */}
    </ul>
    </section>
  );
}

export default MoviesCardList;