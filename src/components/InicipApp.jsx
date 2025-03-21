import React from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import medicalImg from "../assets/images/medical.png";
import { Link } from "react-router-dom";
const InicioApp = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col  items-center ">
      <div className="bg-azul h-[80vh] rounded-b-3xl shadow-xl p-8 flex flex-col justify-center items-center max-w-lg w-full">
        <img
          src={medicalImg}
          alt="Ilustración Bienvenida"
          className="w-48 h-48 mb-6"
        />

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          ¡Bienvenido a TKareBox!
        </h1>
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          to="/login"
          className="flex items-center gap-2 bg-azul text-white px-6 py-3 rounded-lg shadow-lg hover:bg-azul-700/80 transition duration-300"
        >
          <FaSignInAlt /> Iniciar Sesión
        </Link>

        <Link
          to="/register"
          className="flex items-center gap-2 bg-azul text-white px-6 py-3 rounded-lg shadow-lg hover:bg-azul-700/80 transition duration-300"
        >
          <FaUserPlus /> Registrarse
        </Link>
      </div>
    </div>
  );
};

export default InicioApp;
