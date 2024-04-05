import React from 'react';
import './PageNotFound.css';
import { useNavigate } from "react-router-dom";

function PageNotFound() {

  const navigate = useNavigate();

  return (
    <section className="page-not-found">
      <h1 className="page-not-found__code">404</h1>
      <p className="page-not-found__text">Page Not Found</p>
      <button
        onClick={() => navigate(-1)}
        className="page-not-found__link"
        aria-label="to main page"
      >Back</button>
    </section>
  );
}

export default PageNotFound;