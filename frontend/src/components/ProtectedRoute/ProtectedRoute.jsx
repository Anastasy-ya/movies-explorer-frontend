import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element: Component, ...props }) => {

  console.log('Component', Component, 'props.isLoggedIn', props.isLoggedIn);

  return props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/signin" replace />
  );
};
