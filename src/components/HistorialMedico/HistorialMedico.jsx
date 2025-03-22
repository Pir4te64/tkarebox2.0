import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importa useNavigate
import { HistorialMedicoGET } from "./HistorialMedicoGET";
import CrearHistorialMedico from "./CrearHistorialMedico"; // Importamos el componente de CrearHistorialMedico
import { formatDatePrincipal, formatDateYYYYMMDD } from "./Fechas";
import { HistorialMedicoPOST } from "./HistorialMedicoPOST";
import { deleteHistorialMedico } from "./HistorialMedicoDELETE";

const HistorialMedico = () => {
  const { state: profile } = useLocation();
  const navigate = useNavigate();
  const location = useLocation(); // Para detectar cambios en la ruta

  const [historial, setHistorial] = useState([]); // Local state para historial
  const [loading, setLoading] = useState(false); // Loader
  const [isCreating, setIsCreating] = useState(false); // Para controlar la creación
  const [userDataId, setUserDataId] = useState(null); // Para almacenar userDataId

  useEffect(() => {
    if (profile?.id && !isCreating) {
      setLoading(true);
      HistorialMedicoGET(profile.id)
        .then((data) => {
          if (data.historial && data.historial.length > 0) {
            setHistorial(data.historial);
          }
          setUserDataId(data.userDataId);
        })
        .catch((err) => {
          console.error("Error al obtener el historial médico:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [profile, isCreating, location.key]); // Se recarga cada vez que cambia la ubicación

  const handleGuardar = async (newHistorial) => {
    try {
      const updatedHistorial = { ...newHistorial, userDataId };
      const formattedDate = formatDatePrincipal(updatedHistorial.date);
      const finalHistorial = { ...updatedHistorial, date: formattedDate };

      const success = await HistorialMedicoPOST(finalHistorial, setLoading);
      HistorialMedicoGET(profile.id);
      if (success) {
        alert("Historial médico creado exitosamente");
      }
    } catch (error) {
      console.error("Error al crear el historial médico:", error);
      alert("Error al crear el historial médico");
    }
  };

  const handleEliminar = async (historialId) => {
    const success = await deleteHistorialMedico(historialId, setLoading);
    if (success) {
      setHistorial((prevHistorial) =>
        prevHistorial.filter((h) => h.id !== historialId)
      );
    } else {
      alert("Error al eliminar el historial médico");
    }
  };

  const handleEditar = (historial) => {
    // Redirige a la página de edición pasando el historial completo
    navigate("/examenesLaboratorioEditar", { state: { historial } });
  };

  return (
    <div className="px-4 py-6 max-w-md mx-auto">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <CrearHistorialMedico handleGuardar={handleGuardar} />

          {/* Sección de tarjetas */}
          <div className="mt-6 space-y-4">
            {historial.map((item) => (
              <details
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <summary className="text-lg font-semibold text-azul cursor-pointer">
                  {item.specialty} - {item.date}
                </summary>
                <div className="mt-2 pl-2 border-l border-gray-200">
                  <div className="mb-2">
                    <strong>Médico Tratante:</strong>{" "}
                    <span className="text-gray-700">
                      {item.treatingPhysician}
                    </span>
                  </div>

                  {/* Síntomas */}
                  <div className="mb-2">
                    <strong>Síntomas:</strong>
                    <ul className="list-disc ml-4 text-gray-700">
                      {item.originalSymptoms.map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Diagnósticos */}
                  {/* Diagnósticos */}
                  <div className="mb-2">
                    <strong>Diagnósticos:</strong>
                    <ul className="list-disc ml-4 text-gray-700">
                      {item.diagnoses.map((diagnosis, index) => (
                        <li key={index}>{diagnosis}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Tratamientos */}
                  <div className="mb-2">
                    <strong>Tratamientos:</strong>
                    <ul className="list-disc ml-4 text-gray-700">
                      {item.treatments.map((treatment, index) => (
                        <li key={index}>
                          <span className="font-medium">Fecha:</span>{" "}
                          {formatDateYYYYMMDD(treatment.treatmentDate)}
                          <br />
                          <span className="font-medium">Documento:</span>{" "}
                          {treatment.urlDocTreatment}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Seguimientos */}
                  <div className="mb-2">
                    <strong>Seguimientos:</strong>
                    <ul className="list-disc ml-4 text-gray-700">
                      {item.followUps.map((followUp, index) => (
                        <li key={index}>
                          <span className="font-medium">Fecha:</span>{" "}
                          {formatDateYYYYMMDD(followUp.followUpDate)}
                          <br />
                          <span className="font-medium">Notas:</span>{" "}
                          {followUp.followUpNotes}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Órdenes */}
                  <div className="mb-2">
                    <strong>Órdenes:</strong>
                    <ul className="list-disc ml-4 text-gray-700">
                      {item.orders.map((order, index) => (
                        <li key={index}>
                          <span className="font-medium">Fecha:</span>{" "}
                          {formatDateYYYYMMDD(order.ordersDate)}
                          <br />
                          <span className="font-medium">Documento:</span>{" "}
                          {order.urlDocOrders}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEliminar(item.id)}
                      className="text-red-500 bg-red-100 px-4 py-2 rounded-md hover:text-red-700 text-sm"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleEditar(item)}
                      className="text-blue-500 bg-blue-100 px-4 py-2 rounded-md hover:text-blue-700 text-sm"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HistorialMedico;
