import React from 'react';
import './PageNotFound.css';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <section className="page-not-found">
      <h1 className="page-not-found__code">404</h1>
      <p className="page-not-found__text">страница не найдена</p>
      <Link
        to="/"
        className="page-not-found__link"
        aria-label="to main page"
      >Назад</Link>
    </section>
  );
}

export default PageNotFound;