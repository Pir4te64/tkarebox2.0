// src/components/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = () => {
  const { token } = useContext(AuthContext);

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
