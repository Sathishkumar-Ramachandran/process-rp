import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  return (
    <Route
      {...rest}
      element={isAuthenticated ? (
        element
      ) : (
        <Navigate to="/login" replace />
      )}
    />
  );
};

export default PrivateRoute;
