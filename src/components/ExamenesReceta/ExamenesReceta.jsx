import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API } from "../../utils/Api";

const ExamenesReceta = () => {
  const location = useLocation();
  const { ficha } = location.state || {};
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ficha) return; // No se realiza la petición si no se tiene "ficha"

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API.CHATGPT_CONSULTA_RECIPE, {
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
  const recipes = data.body;

  return (
    <div className='p-4 min-h-screen overflow-y-auto'>
      <h1 className='text-3xl font-bold mb-6 text-white text-center'>
        Recetas Médicas
      </h1>
      <div className='grid grid-cols-1 gap-3 overflow-y-auto h-[500px] my-3'>
        {recipes.map((recipe) => {
          // Formatear la fecha: la fecha viene como [año, mes, día]
          const [year, month, day] = recipe.date;
          const formattedDate = `${day}/${month}/${year}`;
          return (
            <div
              key={recipe.id}
              className='bg-white border-l-4 border-azul shadow-md rounded p-4'>
              <div className='mb-2'>
                <span className='font-semibold text-azul'>Fecha: </span>
                <span className='text-gray-700'>{formattedDate}</span>
              </div>
              <div className='mb-2'>
                <span className='font-semibold text-azul'>Doctor: </span>
                <span className='text-gray-700'>{recipe.doctorName}</span>
              </div>
              <div>
                <span className='font-semibold text-azul'>Receta: </span>
                <a
                  href={recipe.urlRecipe}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 underline'>
                  Ver Receta
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExamenesReceta;
