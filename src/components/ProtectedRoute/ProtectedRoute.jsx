import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element: Component, ...props }) => {
  //это мэйн с пропсами
  return props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/signin" replace />
  );
};
