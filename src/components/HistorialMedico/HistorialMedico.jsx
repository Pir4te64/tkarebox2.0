import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HistorialMedicoGET } from "./HistorialMedicoGET";
import { updateHistorialMedico } from "./HistorialMedicoPUT";
import FormularioHistorialMedico from "./HistorialMedicoEditar";
import useHistorialMedicoStore from "./useHistorialMedicoStore";

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

  useEffect(() => {
    if (profile?.id) {
      HistorialMedicoGET(profile.id)
        .then((data) => {
          if (data.historial && data.historial.length > 0) {
            console.log("data.historial", data.historial);
            setHistorial(data.historial[0]);
          }
        })
        .catch((err) => {
          console.error("Error al obtener el historial médico:", err);
        });
    }
  }, [profile, setHistorial]);

  const handleActualizar = async (e) => {
    e.preventDefault();
    try {
      const result = await updateHistorialMedico(historial, profile?.id);
      console.log("Historial actualizado:", result);
      alert("Historial actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el historial:", error);
      alert("Error al actualizar el historial");
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
    </div>
  );
};

export default HistorialMedico;
