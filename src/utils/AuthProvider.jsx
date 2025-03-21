// src/utils/authProvider/AuthProvider.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos almacenados al iniciar la aplicación
  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUsername = localStorage.getItem("username");
        const storedRole = localStorage.getItem("role");

        if (storedToken && storedUsername && storedRole) {
          setToken(storedToken);
          setUsername(storedUsername);
          setRole(storedRole);
        }
      } catch (error) {
        console.error("Error cargando datos de sesión:", error);
      }
      setLoading(false);
    };

    loadUserData();
  }, []);

  // Función para iniciar sesión
  const login = (userToken, userName, userRole) => {
    try {
      localStorage.setItem("token", userToken);
      localStorage.setItem("username", userName);
      localStorage.setItem("role", userRole);

      setToken(userToken);
      setUsername(userName);
      setRole(userRole);

      console.log("Sesión iniciada correctamente.");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");

      setToken(null);
      setUsername(null);
      setRole(null);

      console.log("Sesión cerrada correctamente.");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, username, role, loading, login, logout }}
    >
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <span>Cargando...</span>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};