import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { examenesLabGET } from "./ExamenesLabGET";
import Layout from "../Layout";

const ExamenesLab = () => {
  const location = useLocation();
  const { ficha } = location.state || {};

  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConsultar = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await examenesLabGET(ficha, fechaDesde, fechaHasta);
      console.log(data);
      setResultado(data);
    } catch (err) {
      setError(err.message || "Error al consultar exámenes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto p-4 bg-white shadow rounded mt-4">
        <h1 className="text-2xl font-bold mb-4">Exámenes de Laboratorio</h1>
        <div className="space-y-4">
          {/* Fecha Desde */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Fecha Desde:
            </label>
            <input
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Fecha Hasta */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Fecha Hasta:
            </label>
            <input
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleConsultar}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-indigo-700 transition mt-4"
          >
            Consultar
          </button>
        </div>

        {loading && <p className="text-center mt-4">Cargando...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {resultado && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Resultados:</h2>
            <pre className="bg-gray-100 p-4 rounded shadow text-sm text-gray-800">
              {JSON.stringify(resultado, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ExamenesLab;
