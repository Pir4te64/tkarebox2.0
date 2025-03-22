import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HistorialMedicoGET } from "./HistorialMedicoGET";
import { updateHistorialMedico } from "./HistorialMedicoPUT";
import CrearHistorialMedico from "./CrearHistorialMedico"; // Importamos el componente de CrearHistorialMedico
import FormularioHistorialMedico from "./HistorialMedicoEditar";
import { formatDatePrincipal } from "./Fechas";
import { HistorialMedicoPOST } from "./HistorialMedicoPOST";

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
            console.log("data", data.historial);
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

  const handleActualizar = async (e, historialId) => {
    e.preventDefault(); // Previene el comportamiento por defecto del evento
    const updatedHistorial = historial.find((h) => h.id === historialId);

    try {
      const formattedDate = formatDatePrincipal(updatedHistorial.date);
      const finalHistorial = { ...updatedHistorial, date: formattedDate };
      console.log(finalHistorial);

      setLoading(true);
      await updateHistorialMedico(finalHistorial, profile?.id);

      const updatedData = await HistorialMedicoGET(profile?.id);
      if (updatedData.historial && updatedData.historial.length > 0) {
        setHistorial(updatedData.historial);
      }
    } catch (error) {
      console.error("Error al actualizar el historial:", error);
      alert("Error al actualizar el historial");
    } finally {
      setLoading(false);
    }
  };

  const handleGuardar = async (newHistorial) => {
    try {
      const updatedHistorial = { ...newHistorial, userDataId };
      const formattedDate = formatDatePrincipal(updatedHistorial.date);
      const finalHistorial = { ...updatedHistorial, date: formattedDate };

      const success = await HistorialMedicoPOST(finalHistorial, setLoading);
      if (success) {
        console.log("Historial médico creado exitosamente");
      }
    } catch (error) {
      console.error("Error al crear el historial médico:", error);
      alert("Error al crear el historial médico");
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
          {historial && historial.length > 0 && (
            <>
              {historial.map((h) => (
                <FormularioHistorialMedico
                  key={h.id}
                  historial={h} // Solo pasamos el historial completo
                  handleActualizar={(e) => handleActualizar(e, h.id)} // Se pasa solo la función
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HistorialMedico;
