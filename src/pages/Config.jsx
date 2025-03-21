import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { AuthContext } from "../utils/AuthProvider";

const Config = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Layout>
      {/* Sección superior estilo 'Home' */}
      <div className="flex-grow bg-azul rounded-b-3xl shadow-xl p-8 h-[300px] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Configuración
        </h2>
      </div>

      {/* Botón en la parte inferior */}
      <div className="p-4 flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 w-full max-w-sm"
        >
          Cerrar Sesión
        </button>
      </div>
    </Layout>
  );
};

export default Config;
