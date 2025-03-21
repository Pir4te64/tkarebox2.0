// Home.jsx
import React from "react";
import Layout from "../Layout";

const Home = () => {
  return (
    <Layout>
      <div className="bg-azul rounded-b-3xl shadow-xl p-8 flex flex-col items-center">
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <button className="bg-black text-white py-4 px-2 rounded-lg font-semibold">
            Menú de Administración
          </button>
          <button className="bg-yellow-500 text-white py-4 px-2 rounded-lg font-semibold">
            Perfil de Identificación Médica
          </button>
          <button className="bg-indigo-700 text-white py-4 px-2 rounded-lg font-semibold">
            Exámenes de Laboratorio
          </button>
          <button className="bg-yellow-400 text-black py-4 px-2 rounded-lg font-semibold">
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
          <button className="bg-red-600 text-white py-4 px-2 rounded-lg font-semibold">
            Datos de Emergencia
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
