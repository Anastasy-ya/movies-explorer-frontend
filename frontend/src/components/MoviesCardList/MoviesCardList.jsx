import React from 'react';
import './MoviesCardList.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList(props) {
  // isMoviePage, movies, isLoggedIn, handleSaveMovie

  // console.log(props.movies)

  


  return (
    <section className="card-list">

      <SearchForm 
        handleSerchSubmit={props.handleSerchSubmit}
        requestMessage={props.requestMessage}
        movies={props.movies}
        handleSearchMovie={props.handleSearchMovie}
      />

      <ul className="card-list__size-container size-container">
        {props.movies.map((movie) => (
          <>
          {/* {console.log(movie.id)} */}
          <MoviesCard
            key={movie.id}
            movie={movie}
            isMoviePage={props.isMoviePage}
            // handleSearchMovie={(movie) => props.handleSearchMovie(movie)}
            requestMessage={props.requestMessage}
          />
          </>
        ))}

      </ul>


    </section>
  );
}

export default MoviesCardList;