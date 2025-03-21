// Home.jsx
import React from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Layout>
      <div className="bg-azul h-screen rounded-b-3xl shadow-xl p-8 flex flex-col items-center justify-center">
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <Link
            to="/administracion"
            className="bg-black text-center text-white py-4 px-2 rounded-lg font-semibold"
          >
            Menú de Administración
          </Link>
          <Link
            to="/fichaMedica"
            className="bg-yellow-500 text-white text-center py-4 px-2 rounded-lg font-semibold"
          >
            Perfil de Identificación Médica
          </Link>
          <button className="bg-indigo-700 text-white py-4 px-2 rounded-lg font-semibold">
            Exámenes de Laboratorio
          </button>
          <button className="bg-yellow-500 text-black py-4 px-2 rounded-lg font-semibold">
            Examen de Imagen
          </button>
          <button className="bg-green-600 text-white py-4 px-2 rounded-lg font-semibold">
            Recetas
          </button>
          <button className="bg-purple-600 text-white py-4 px-2 rounded-lg font-semibold">
            Historial de Consultas Médicas
          </button>
          <button className="bg-gray-500 text-white py-4 px-2 rounded-lg font-semibold">
            Próximo Control
            <span className="block text-xs">(Actualmente no disponible)</span>
          </button>
          <Link
            to="/contactos"
            className="bg-red-600 text-white py-4 px-2 rounded-lg font-semibold text-center"
          >
            Datos de Emergencia
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
