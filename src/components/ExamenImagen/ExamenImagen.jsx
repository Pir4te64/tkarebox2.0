import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API } from "../../utils/Api";

const ExamenImagen = () => {
  const location = useLocation();
  const { ficha } = location.state || {};
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // Objeto para almacenar la URL de descarga de cada estudio
  const [downloadUrls, setDownloadUrls] = useState({});

  useEffect(() => {
    if (!ficha) return; // No se realiza la petición sin "ficha"

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        // Primera petición: obtener datos del examen
        const response = await axios.get(API.CHATGPT_CONSULTA_IMAGE, {
          params: { userDataId: ficha },
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);

        // Verificar que hay estudios
        if (response.data.body && response.data.body.length > 0) {
          const studies = response.data.body;
          // Objeto temporal para almacenar cada URL
          const urls = {};
          // Realizamos peticiones paralelas para cada estudio usando Promise.all
          await Promise.all(
            studies.map(async (study) => {
              try {
                const downloadResponse = await axios.post(
                  API.CHATGPT_CONSULTA_IMAGE_DOWNLOAD,
                  { fileName: study.studyName },
                  { headers: { Authorization: `Bearer ${token}` } }
                );

                // Guardar la URL usando el id del estudio o studyName
                if (downloadResponse.data && downloadResponse.data.body) {
                  urls[study.id] = {
                    url: downloadResponse.data.body,
                    name: study.studyName,
                  };
                }
              } catch (err) {
                console.error(
                  `Error descargando ${study.studyName}:`,
                  err.message
                );
              }
            })
          );
          setDownloadUrls(urls);
        }
      } catch (err) {
        console.error("Error en la petición:", err);
        setError(err);
      }
    };

    fetchData();
  }, [ficha]);

  // Función para descargar el PDF usando la URL y el nombre del estudio
  const handleDownload = (url, name) => {
    if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${name}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  const studies = data.body;

  return (
    <div className='p-4 min-h-screen'>
      <h1 className='text-3xl font-bold mb-6 text-white text-center'>
        Examen Imagen
      </h1>
      <div className='grid grid-cols-1 gap-6 h-[500px] overflow-y-auto'>
        {studies.map((study) => {
          // Formatear la fecha: se recibe como [año, mes, día]
          const [year, month, day] = study.date;
          const formattedDate = `${day}/${month}/${year}`;
          const downloadData = downloadUrls[study.id];

          return (
            <div
              key={study.id}
              className='bg-white border-l-4 border-azul shadow-md rounded p-4'>
              <div className='mb-2'>
                <span className='font-semibold text-azul'>Fecha: </span>
                <span className='text-gray-700'>{formattedDate}</span>
              </div>
              <div className='mb-2'>
                <span className='font-semibold text-azul'>Estudio: </span>
                <span className='text-gray-700'>{study.studyName}</span>
              </div>
              <div className='mb-2'>
                <span className='font-semibold text-azul'>Reporte: </span>
                <span className='text-gray-700'>{study.studyReport}</span>
              </div>
              <div className='mb-2'>
                <span className='font-semibold text-azul'>Conclusión: </span>
                <span className='text-gray-700'>{study.conclusion}</span>
              </div>
              <div className='mb-2'>
                <span className='font-semibold text-azul'>Médico: </span>
                <span className='text-gray-700'>{study.medical}</span>
              </div>
              <div>
                <span className='font-semibold text-azul'>Imagen: </span>
                <a
                  href={study.urlRecipe}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 underline'>
                  Ver Imagen
                </a>
                {/* Botón "Descargar PDF" debajo del enlace "Ver Imagen" */}
                {downloadData && downloadData.url && (
                  <div className='mt-2 flex justify-center items-center'>
                    <button
                      onClick={() =>
                        handleDownload(downloadData.url, downloadData.name)
                      }
                      className='text-blue-700 px-4 py-2 rounded'>
                      Descargar PDF
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExamenImagen;
