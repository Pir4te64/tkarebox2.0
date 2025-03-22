import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HistorialMedicoGET } from "./HistorialMedicoGET";
import { updateHistorialMedico } from "./HistorialMedicoPUT";
import FormularioHistorialMedico from "./HistorialMedicoEditar";
import useHistorialMedicoStore from "./useHistorialMedicoStore";
import { formatDatePrincipal } from "./Fechas";

const HistorialMedico = () => {
  const { state: profile } = useLocation();

  const {
    historial,
    setHistorial,
    updateField,
    updateArrayField,
    updateTreatment,
    updateFollowUp,
    updateOrder,
  } = useHistorialMedicoStore();

  const [loading, setLoading] = useState(false); // Nuevo estado para el loader

  useEffect(() => {
    if (profile?.id) {
      setLoading(true); // Empezamos a cargar los datos
      HistorialMedicoGET(profile.id)
        .then((data) => {
          if (data.historial && data.historial.length > 0) {
            setHistorial(data.historial[0]);
          }
        })
        .catch((err) => {
          console.error("Error al obtener el historial médico:", err);
        })
        .finally(() => {
          setLoading(false); // Terminamos de cargar los datos
        });
    }
  }, [profile, setHistorial]);

  const handleActualizar = async (e) => {
    e.preventDefault();
    try {
      // Formatea la fecha como cadena de texto en el formato yyyy-MM-dd
      const formattedDate = formatDatePrincipal(historial.date);
      const updatedHistorial = { ...historial, date: formattedDate };

      setLoading(true); // Empezamos a cargar mientras se actualiza
      const result = await updateHistorialMedico(updatedHistorial, profile?.id);

      // Volver a obtener los datos después de actualizar
      const updatedData = await HistorialMedicoGET(profile?.id);
      if (updatedData.historial && updatedData.historial.length > 0) {
        setHistorial(updatedData.historial[0]);
      }
    } catch (error) {
      console.error("Error al actualizar el historial:", error);
      alert("Error al actualizar el historial");
    } finally {
      setLoading(false); // Terminamos de cargar los datos después de la actualización
    }
  };

  // Función para agregar un nuevo ítem al array
  const handleAddItem = (field) => {
    if (field === "originalSymptoms") {
      setHistorial({
        ...historial,
        originalSymptoms: [...historial.originalSymptoms, ""],
      });
    } else if (field === "diagnoses") {
      setHistorial({
        ...historial,
        diagnoses: [...historial.diagnoses, ""],
      });
    } else if (field === "treatments") {
      setHistorial({
        ...historial,
        treatments: [
          ...historial.treatments,
          { treatmentDate: [""], urlDocTreatment: "" },
        ],
      });
    } else if (field === "followUps") {
      setHistorial({
        ...historial,
        followUps: [
          ...historial.followUps,
          { followUpDate: [""], followUpNotes: "" },
        ],
      });
    } else if (field === "orders") {
      setHistorial({
        ...historial,
        orders: [...historial.orders, { ordersDate: [""], urlDocOrders: "" }],
      });
    }
  };

  // Función para eliminar un ítem del array
  const handleRemoveItem = (field, index) => {
    if (field === "originalSymptoms") {
      const updatedSymptoms = historial.originalSymptoms.filter(
        (_, i) => i !== index
      );
      setHistorial({
        ...historial,
        originalSymptoms: updatedSymptoms,
      });
    } else if (field === "diagnoses") {
      const updatedDiagnoses = historial.diagnoses.filter(
        (_, i) => i !== index
      );
      setHistorial({
        ...historial,
        diagnoses: updatedDiagnoses,
      });
    } else if (field === "treatments") {
      const updatedTreatments = historial.treatments.filter(
        (_, i) => i !== index
      );
      setHistorial({
        ...historial,
        treatments: updatedTreatments,
      });
    } else if (field === "followUps") {
      const updatedFollowUps = historial.followUps.filter(
        (_, i) => i !== index
      );
      setHistorial({
        ...historial,
        followUps: updatedFollowUps,
      });
    } else if (field === "orders") {
      const updatedOrders = historial.orders.filter((_, i) => i !== index);
      setHistorial({
        ...historial,
        orders: updatedOrders,
      });
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Mostrar loader mientras cargamos los datos */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
        </div>
      ) : (
        <FormularioHistorialMedico
          historial={historial}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
          updateField={updateField}
          updateArrayField={updateArrayField}
          updateTreatment={updateTreatment}
          updateFollowUp={updateFollowUp}
          updateOrder={updateOrder}
          handleActualizar={handleActualizar}
        />
      )}
    </div>
  );
};

export default HistorialMedico;
