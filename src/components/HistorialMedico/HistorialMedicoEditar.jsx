import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa"; // Importar los iconos
import { formatDatePrincipal } from "./Fechas";

const FormularioHistorialMedico = ({
  historial, // Manteniendo el nombre original de la prop
  handleActualizar, // Recibimos handleActualizar como prop
}) => {
  const [historialState, setHistorial] = useState(historial); // Estado local para el historial
  // Función para formatear la fecha en el formato yyyy-MM-dd (para mostrar en el input)
  const formatDate = (date) => {
    if (Array.isArray(date) && date.length === 3) {
      const year = date[0];
      const month = date[1] < 10 ? `0${date[1]}` : date[1];
      const day = date[2] < 10 ? `0${date[2]}` : date[2];
      return `${year}-${month}-${day}`;
    }
    return ""; // Si la fecha no es válida, devolvemos una cadena vacía
  };

  // Función para convertir la fecha del input de tipo date a un array [year, month, day]
  const convertToDateArray = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return [year, month, day];
  };

  // Función para agregar un nuevo ítem al array
  const handleAddItem = (field) => {
    if (field === "originalSymptoms") {
      setHistorial({
        ...historialState,
        originalSymptoms: [...historialState.originalSymptoms, ""],
      });
    } else if (field === "diagnoses") {
      setHistorial({
        ...historialState,
        diagnoses: [...historialState.diagnoses, ""],
      });
    } else if (field === "treatments") {
      setHistorial({
        ...historialState,
        treatments: [
          ...historialState.treatments,
          { treatmentDate: [""], urlDocTreatment: "" },
        ],
      });
    } else if (field === "followUps") {
      setHistorial({
        ...historialState,
        followUps: [
          ...historialState.followUps,
          { followUpDate: [""], followUpNotes: "" },
        ],
      });
    } else if (field === "orders") {
      setHistorial({
        ...historialState,
        orders: [
          ...historialState.orders,
          { ordersDate: [""], urlDocOrders: "" },
        ],
      });
    }
  };

  // Función para eliminar un ítem del array
  const handleRemoveItem = (field, index) => {
    if (field === "originalSymptoms") {
      const updatedSymptoms = historialState.originalSymptoms.filter(
        (_, i) => i !== index
      );
      setHistorial({
        ...historialState,
        originalSymptoms: updatedSymptoms,
      });
    } else if (field === "diagnoses") {
      const updatedDiagnoses = historialState.diagnoses.filter(
        (_, i) => i !== index
      );
      setHistorial({
        ...historialState,
        diagnoses: updatedDiagnoses,
      });
    } else if (field === "treatments") {
      const updatedTreatments = historialState.treatments.filter(
        (_, i) => i !== index
      );
      setHistorial({
        ...historialState,
        treatments: updatedTreatments,
      });
    } else if (field === "followUps") {
      const updatedFollowUps = historialState.followUps.filter(
        (_, i) => i !== index
      );
      setHistorial({
        ...historialState,
        followUps: updatedFollowUps,
      });
    } else if (field === "orders") {
      const updatedOrders = historialState.orders.filter((_, i) => i !== index);
      setHistorial({
        ...historialState,
        orders: updatedOrders,
      });
    }
  };

  // Actualiza el campo de tratamiento
  const updateTreatment = (index, field, value) => {
    const newTreatments = historialState.treatments.map((treatment, i) =>
      i === index ? { ...treatment, [field]: value } : treatment
    );
    setHistorial({
      ...historialState,
      treatments: newTreatments,
    });
  };

  // Función para actualizar el historial
  const handleSubmit = (e) => {
    e.preventDefault();
    handleActualizar(e, historialState); // Enviar historial actualizado a la función handleActualizar
  };

  return (
    <form
      className="space-y-6 mt-0 bg-blue-50 p-6 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      {/* Datos */}
      <details className="border-b-2 pb-4">
        <summary className="text-azul cursor-pointer font-semibold bg-blue-100 p-2 rounded-md hover:bg-blue-200 mb-2">
          Datos
        </summary>
        <div className="space-y-4">
          {/* Fecha */}
          <div>
            <label className="block font-medium mb-1 text-azul">Fecha:</label>
            <input
              type="date"
              value={formatDate(historialState.date)}
              onChange={(e) =>
                setHistorial({
                  ...historialState,
                  date: convertToDateArray(e.target.value),
                })
              }
              className="w-full border border-azul rounded px-3 py-2 focus:outline-none focus:ring focus:border-azul"
            />
          </div>
          {/* Especialidad */}
          <div>
            <label className="block font-medium mb-1 text-azul">
              Especialidad:
            </label>
            <input
              type="text"
              value={historialState.specialty || ""}
              onChange={(e) =>
                setHistorial({ ...historialState, specialty: e.target.value })
              }
              className="w-full border border-azul rounded px-3 py-2 focus:outline-none focus:ring focus:border-azul"
            />
          </div>
          {/* Médico tratante */}
          <div>
            <label className="block font-medium mb-1 text-azul">
              Médico tratante:
            </label>
            <input
              type="text"
              value={historialState.treatingPhysician || ""}
              onChange={(e) =>
                setHistorial({
                  ...historialState,
                  treatingPhysician: e.target.value,
                })
              }
              className="w-full border border-azul rounded px-3 py-2 focus:outline-none focus:ring focus:border-azul"
            />
          </div>
        </div>
      </details>

      {/* Agrupación de Síntomas y Diagnósticos */}
      <details className="border-b-2 pb-4">
        <summary className="text-azul cursor-pointer font-semibold bg-blue-100 p-2 rounded-md hover:bg-blue-200 mb-2">
          Síntomas originales y Diagnósticos:
        </summary>

        {/* Síntomas originales */}
        {historialState.originalSymptoms?.map((symptom, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="text"
              value={symptom || ""}
              onChange={(e) =>
                setHistorial({
                  ...historialState,
                  originalSymptoms: historialState.originalSymptoms.map(
                    (s, i) => (i === index ? e.target.value : s)
                  ),
                })
              }
              className="w-full border border-azul rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-azul"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem("originalSymptoms", index)}
              className="text-red-500"
            >
              <FaMinus />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("originalSymptoms")}
          className="text-azul bg-blue-100 hover:bg-blue-200 p-2 my-2 rounded-md"
        >
          <FaPlus />
        </button>

        {/* Diagnósticos */}
        {historialState.diagnoses?.map((diagnosis, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="text"
              value={diagnosis || ""}
              onChange={(e) =>
                setHistorial({
                  ...historialState,
                  diagnoses: historialState.diagnoses.map((d, i) =>
                    i === index ? e.target.value : d
                  ),
                })
              }
              className="w-full border border-azul rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-azul"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem("diagnoses", index)}
              className="text-red-500"
            >
              <FaMinus />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("diagnoses")}
          className="text-azul bg-blue-100 hover:bg-blue-200 p-2 my-2 rounded-md"
        >
          <FaPlus />
        </button>
      </details>

      {/* Agrupación de Tratamientos, Seguimientos y Órdenes */}
      {/* Tratamientos */}
      <details className="border-b-2 pb-4">
        <summary className="text-azul cursor-pointer font-semibold bg-blue-100 p-2 rounded-md hover:bg-blue-200 mb-2">
          Tratamientos
        </summary>

        {historialState.treatments?.map((treatment, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="date"
              value={formatDate(treatment.treatmentDate)}
              onChange={(e) => {
                const newTreatmentDate = convertToDateArray(e.target.value);
                updateTreatment(index, "treatmentDate", newTreatmentDate);
              }}
              className="w-full border border-blue-300 rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-blue-500"
            />
            <input
              type="text"
              value={treatment.urlDocTreatment || ""}
              onChange={(e) => {
                updateTreatment(index, "urlDocTreatment", e.target.value);
              }}
              className="w-full border border-blue-300 rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem("treatments", index)}
              className="text-red-500"
            >
              <FaMinus />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("treatments")}
          className="text-blue-600 bg-blue-100 hover:bg-blue-200 p-2 my-2 rounded-md"
        >
          <FaPlus />
        </button>
      </details>

      {/* Botón para actualizar */}
      <div className="">
        <button
          type="submit"
          className="w-full bg-azul hover:bg-azul/80 text-white py-3 rounded-lg font-semibold transition duration-200"
        >
          Actualizar
        </button>
      </div>
    </form>
  );
};

export default FormularioHistorialMedico;
