import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API } from "../../utils/Api";

const ExamenImagen = () => {
  const location = useLocation();
  const { ficha } = location.state || {};
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ficha) return; // No se realiza la petición si no se tiene "ficha"

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API.CHATGPT_CONSULTA_IMAGE, {
          params: { userDataId: ficha },
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (err) {
        console.error("Error en la petición:", err);
        setError(err);
      }
    };

    fetchData();
  }, [ficha]);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  // Se asume que los datos se encuentran en data.body
  const studies = data.body;

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">
        Examen Imagen
      </h1>
      <div className="grid grid-cols-1 gap-6">
        {studies.map((study) => {
          // Formatear la fecha: la fecha viene como [año, mes, día]
          const [year, month, day] = study.date;
          const formattedDate = `${day}/${month}/${year}`;
          return (
            <div
              key={study.id}
              className="bg-white border-l-4 border-azul shadow-md rounded p-4"
            >
              <div className="mb-2">
                <span className="font-semibold text-azul">Fecha: </span>
                <span className="text-gray-700">{formattedDate}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-azul">Estudio: </span>
                <span className="text-gray-700">{study.studyName}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-azul">Reporte: </span>
                <span className="text-gray-700">{study.studyReport}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-azul">Conclusión: </span>
                <span className="text-gray-700">{study.conclusion}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-azul">Médico: </span>
                <span className="text-gray-700">{study.medical}</span>
              </div>
              <div>
                <span className="font-semibold text-azul">Imagen: </span>
                <a
                  href={study.urlRecipe}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Ver Imagen
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExamenImagen;
