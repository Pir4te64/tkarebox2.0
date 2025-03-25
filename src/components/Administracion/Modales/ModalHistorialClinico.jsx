// src/components/ModalHistorialConsultas.jsx
import React, { useEffect, useState, useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import { HistorialMedicoGET } from "../../HistorialMedico/HistorialMedicoGET";
import PieChartConsultas from "../PieChartConsultas";

const ModalHistorialConsultas = ({ isOpen, onClose, user }) => {
  const [historial, setHistorial] = useState(null);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const historialData = await HistorialMedicoGET(user.id);
        console.log("Historial obtenido:", historialData);
        setHistorial(historialData);
      } catch (error) {
        console.error("Error al obtener el historial:", error);
      }
    };

    if (isOpen && user && user.id) {
      fetchHistorial();
    }
  }, [isOpen, user]);

  const historialAgrupado = useMemo(() => {
    if (!historial || !historial.historial) return {};
    return historial.historial.reduce((acc, consulta) => {
      const { specialty } = consulta;
      if (!acc[specialty]) {
        acc[specialty] = [];
      }
      acc[specialty].push(consulta);
      return acc;
    }, {});
  }, [historial]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      <div className="relative bg-white rounded-lg shadow p-4 w-full max-w-md h-auto max-h-[90vh] flex flex-col">
        {/* Encabezado fijo con botón de cerrar */}
        <div className="flex justify-between items-center pb-2 border-b">
          <h3 className="text-lg  text-gray-800">
            Historial de Consultas Médicas
          </h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>
        {/* Contenedor scrollable para el contenido */}
        <div className="mt-4">
          {historial && historial.historial ? (
            <PieChartConsultas data={historial.historial} />
          ) : (
            <p className="text-center text-gray-600">Cargando gráfico...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalHistorialConsultas;
