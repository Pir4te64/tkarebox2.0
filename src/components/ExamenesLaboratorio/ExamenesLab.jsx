// src/components/ExamenesLab.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { examenesLabGET } from "./ExamenesLabGET";
import ChartForTest from "./ExamenGrafico";

const ExamenesLab = () => {
  const location = useLocation();
  const { ficha } = location.state || {};

  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Estado para controlar cuántos gráficos se muestran (aparición progresiva)
  const [visibleCount, setVisibleCount] = useState(0);

  const handleConsultar = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await examenesLabGET(ficha, fechaDesde, fechaHasta);
      console.log(data);
      setResultado(data);
      // Reiniciamos visibleCount cada vez que consultamos nuevos datos
      setVisibleCount(0);
    } catch (err) {
      setError(err.message || "Error al consultar exámenes.");
    } finally {
      setLoading(false);
    }
  };

  // Convertir resultado.body en un array (si existe)
  const examenesArray = resultado && resultado.body ? resultado.body : [];

  // Agrupar los exámenes por "test"
  const grouped = examenesArray.reduce((acc, item) => {
    const key = item.test;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const groupedEntries = Object.entries(grouped);

  // Efecto para mostrar progresivamente cada gráfico
  useEffect(() => {
    if (groupedEntries.length > 0 && visibleCount < groupedEntries.length) {
      const timer = setTimeout(() => {
        setVisibleCount(visibleCount + 1);
      }, 500); // Ajusta el tiempo (ms) según prefieras
      return () => clearTimeout(timer);
    }
  }, [visibleCount, groupedEntries.length]);

  return (
    <>
      <div className="max-w-md mx-auto p-4 mt-20 bg-white shadow rounded ">
        <h1 className="text-2xl text-center mb-4">Exámenes de Laboratorio</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Fecha Desde:
            </label>
            <input
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Fecha Hasta:
            </label>
            <input
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            onClick={handleConsultar}
            className="w-full bg-azul text-white py-3 rounded-full font-semibold"
          >
            Consultar
          </button>
        </div>

        {loading && <p className="text-center mt-4">Cargando...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {resultado && resultado.body && (
          <div className="mt-4 space-y-4">
            <h2 className="text-xl text-center mb-2">Gráficos por Examen</h2>
            {groupedEntries
              .slice(0, visibleCount)
              .map(([testName, registros]) => (
                <details key={testName}>
                  <summary className="text-lg font-bold  cursor-pointer">
                    {testName}
                  </summary>
                  <div className="p-2">
                    <ChartForTest data={registros} examName={testName} />
                  </div>
                </details>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ExamenesLab;
