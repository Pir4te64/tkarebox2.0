import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HistorialMedicoGET } from "./HistorialMedicoGET";
import CrearHistorialMedico from "./CrearHistorialMedico"; // Importamos el componente de CrearHistorialMedico
import { formatDatePrincipal } from "./Fechas";
import { HistorialMedicoPOST } from "./HistorialMedicoPOST";
import { deleteHistorialMedico } from "./HistorialMedicoDELETE";

const HistorialMedico = () => {
  const { state: profile } = useLocation();

  const [historial, setHistorial] = useState([]); // Local state para historial
  const [loading, setLoading] = useState(false); // Nuevo estado para el loader
  const [isCreating, setIsCreating] = useState(false); // Estado para verificar si estamos creando un historial
  const [userDataId, setUserDataId] = useState(null); // Estado para almacenar el userDataId

  useEffect(() => {
    if (profile?.id && !isCreating) {
      setLoading(true);
      HistorialMedicoGET(profile.id)
        .then((data) => {
          if (data.historial && data.historial.length > 0) {
            console.log("data.historial", data.historial);

            setHistorial(data.historial);
          }
          setUserDataId(data.userDataId); // Guardamos el userDataId
        })
        .catch((err) => {
          console.error("Error al obtener el historial médico:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [profile, isCreating]);

  const handleGuardar = async (newHistorial) => {
    try {
      const updatedHistorial = { ...newHistorial, userDataId };
      const formattedDate = formatDatePrincipal(updatedHistorial.date);
      const finalHistorial = { ...updatedHistorial, date: formattedDate };

      const success = await HistorialMedicoPOST(finalHistorial, setLoading);
      HistorialMedicoGET(profile.id);
      if (success) {
        console.log("Historial médico creado exitosamente");
      }
    } catch (error) {
      console.error("Error al crear el historial médico:", error);
      alert("Error al crear el historial médico");
    }
  };

  const handleEliminar = async (historialId) => {
    const success = await deleteHistorialMedico(historialId, setLoading);
    if (success) {
      // Eliminar el historial localmente si fue exitoso
      setHistorial((prevHistorial) =>
        prevHistorial.filter((h) => h.id !== historialId)
      );
    } else {
      alert("Error al eliminar el historial médico");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <CrearHistorialMedico handleGuardar={handleGuardar} />
        </>
      )}
    </div>
  );
};

export default HistorialMedico;
