// src/components/PublicRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PublicRoute = () => {
  const { token } = useContext(AuthContext);

  return token ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
