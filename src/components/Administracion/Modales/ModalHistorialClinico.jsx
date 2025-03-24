// src/components/ModalHistorialConsultas.jsx
import React, { useEffect, useState, useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import { HistorialMedicoGET } from "../../HistorialMedico/HistorialMedicoGET";

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
        <div
          className="mt-4 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 120px)" }}
        >
          {historial ? (
            Object.keys(historialAgrupado).length > 0 ? (
              Object.keys(historialAgrupado).map((especialidad) => {
                const firstConsulta = historialAgrupado[especialidad][0];
                return (
                  <div key={especialidad} className="mb-4 border-b pb-2">
                    <h4 className="font-bold text-azul">
                      {especialidad} - {firstConsulta.treatingPhysician}
                    </h4>
                    {historialAgrupado[especialidad].map((consulta) => (
                      <div key={consulta.id} className="mt-2">
                        <p className="text-gray-600">
                          <span className="font-medium">Fecha:</span>{" "}
                          {consulta.date}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Diagnóstico(s):</span>{" "}
                          {consulta.diagnoses.join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-600">
                No se encontraron registros en el historial.
              </p>
            )
          ) : (
            <p className="text-center text-gray-600">Obteniendo historial...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalHistorialConsultas;
