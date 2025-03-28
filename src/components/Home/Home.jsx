import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import { profileAdminGET } from "../Administracion/PerfilAdminGET";
import { ObtenerFichaGET } from "../Administracion/FichaMedica/ObtenerFichaGET";

const Home = () => {
  const [profileId, setProfileId] = useState(null);
  const [ficha, setFicha] = useState(null); // Nuevo estado para la ficha
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1) Obtener el perfil
        const data = await profileAdminGET();

        if (data?.id) {
          setProfileId(data.id);

          // 2) Llamar a ObtenerFichaGET con el id
          const fichaData = await ObtenerFichaGET(data.id);
          setFicha(fichaData.body.userDataId); // Guardamos la ficha en el estado
        } else {
          console.warn("El perfil no tiene un id válido");
        }
      } catch (err) {
        console.error("Error al obtener el perfil o la ficha:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-azul"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-azul h-screen rounded-b-3xl shadow-xl p-8 flex flex-col items-center justify-center">
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <Link
            to="/administracion"
            className="bg-black text-center text-white py-4 px-2 rounded-lg font-semibold h-24 flex items-center justify-center"
          >
            Menú de Administración
          </Link>
          <Link
            to="/fichaMedica"
            className="bg-yellow-500 text-white text-center py-4 px-2 rounded-lg font-semibold h-24 flex items-center justify-center"
          >
            Perfil de Identificación Médica
          </Link>
          {/* Pasar la ficha e id a la pantalla de exámenes */}
          <Link
            to="/examenesLaboratorio"
            state={{ id: profileId, ficha }}
            className="bg-indigo-700 text-white py-4 px-2 rounded-lg font-semibold text-center flex items-center justify-center h-24"
          >
            Exámenes de Laboratorio
          </Link>
          <Link
            to="/examenImagen"
            state={{ id: profileId, ficha }}
            className="bg-yellow-500 text-black py-4 px-2 rounded-lg font-semibold h-24 flex items-center text-center justify-center"
          >
            Examen de Imagen
          </Link>
          <Link
            to="/examenesReceta"
            state={{ id: profileId, ficha }}
            className="bg-green-600 text-white py-4 px-2 rounded-lg font-semibold text-center flex items-center justify-center h-24"
          >
            Recetas
          </Link>
          <Link
            to="/historialMedico"
            state={{ id: profileId }}
            className="bg-purple-600 text-white py-4 px-2 rounded-lg font-semibold h-24 flex items-center text-center justify-center"
          >
            Historial de Consultas Médicas
          </Link>
          <button className="bg-gray-500 text-white py-4 px-2 rounded-lg font-semibold h-24 flex items-center text-center flex-col justify-center">
            Próximo Control
            <span className="block text-xs">(Actualmente no disponible)</span>
          </button>
          <Link
            to="/contactos"
            state={{ id: profileId }}
            className="bg-red-600 text-white py-4 px-2 rounded-lg font-semibold text-center flex items-center justify-center h-24"
          >
            Datos de Emergencia
          </Link>
        </div>

        {!error && !profileId && (
          <p className="text-center text-yellow-300 mt-4">
            El perfil no contiene un ID válido.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Home;
