import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { updateHistorialMedico } from "./HistorialMedicoPUT";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

// Función para formatear fechas en formato yyyy-MM-dd o devolver el string si ya lo es
const formatDate = (date) => {
  if (Array.isArray(date)) {
    const [year, month, day] = date;
    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  }
  return date;
};

const ExamenesLaboratorioEditar = () => {
  const { state } = useLocation(); // Obtiene el historial desde el estado de navegación
  const [historial, setHistorial] = useState(state?.historial || null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e, field, index = null, subField = null) => {
    const { value } = e.target;
    setHistorial((prevState) => {
      const updatedHistorial = { ...prevState };
      if (index !== null && subField) {
        updatedHistorial[field][index][subField] = value;
      } else if (index !== null) {
        updatedHistorial[field][index] = value;
      } else {
        updatedHistorial[field] = value;
      }
      return updatedHistorial;
    });
  };

  // Función para agregar un nuevo elemento al array
  const handleAddItem = (field) => {
    setHistorial((prevState) => {
      const updatedHistorial = { ...prevState };
      if (field === "treatments") {
        updatedHistorial[field] = [
          ...updatedHistorial[field],
          { treatmentDate: "", urlDocTreatment: "" },
        ];
      } else if (field === "followUps") {
        updatedHistorial[field] = [
          ...updatedHistorial[field],
          { followUpDate: "", followUpNotes: "" },
        ];
      } else if (field === "orders") {
        updatedHistorial[field] = [
          ...updatedHistorial[field],
          { ordersDate: "", urlDocOrders: "" },
        ];
      } else {
        updatedHistorial[field] = [...updatedHistorial[field], ""];
      }
      return updatedHistorial;
    });
  };

  // Función para eliminar un elemento del array
  const handleRemoveItem = (field, index) => {
    setHistorial((prevState) => {
      const updatedHistorial = { ...prevState };
      updatedHistorial[field] = updatedHistorial[field].filter(
        (_, i) => i !== index
      );
      return updatedHistorial;
    });
  };

  // Función para enviar el formulario y actualizar el historial mediante PUT
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos actualizados:", historial);
    try {
      setLoading(true);
      const response = await updateHistorialMedico(historial);
      console.log("Historial actualizado con éxito:", response);
      alert("Historial actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el historial médico:", error);
      alert("Hubo un error al actualizar el historial");
    } finally {
      setLoading(false);
    }
  };

  if (!historial) {
    return (
      <div className="text-center p-4">
        No se encontró información para editar.
      </div>
    );
  }

  return (
    <div className="p-4 py-10 max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos */}
        <details className="border-b">
          <summary className="text-azul cursor-pointer font-semibold bg-blue-100 p-2 rounded-md hover:bg-blue-200 mb-2">
            Datos:
          </summary>
          <div className="mb-2">
            <input
              type="text"
              value={historial.specialty || ""}
              onChange={(e) => handleInputChange(e, "specialty")}
              className="w-full border px-3 py-2 rounded"
              placeholder="Especialidad"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              value={historial.treatingPhysician || ""}
              onChange={(e) => handleInputChange(e, "treatingPhysician")}
              className="w-full border px-3 py-2 rounded"
              placeholder="Médico Tratante"
            />
          </div>
          <div className="mb-2">
            <input
              type="date"
              value={formatDate(historial.date) || ""}
              onChange={(e) => handleInputChange(e, "date")}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </details>

        {/* Síntomas */}
        <details className="border-b">
          <summary className="text-azul cursor-pointer font-semibold bg-blue-100 p-2 rounded-md hover:bg-blue-200 mb-2">
            Síntomas:
          </summary>
          <div className="border-b ">
            <label className="flex items-center justify-between font-medium mb-1">
              Síntomas:
              <button
                type="button"
                onClick={() => handleAddItem("originalSymptoms")}
                className="text-blue-500"
              >
                <FaPlus />
              </button>
            </label>
            {(historial.originalSymptoms || []).map((symptom, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={symptom}
                  onChange={(e) =>
                    handleInputChange(e, "originalSymptoms", index)
                  }
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Síntoma"
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
          </div>
        </details>

        {/* Diagnósticos */}
        <details className="border-b">
          <summary className="text-azul cursor-pointer font-semibold bg-blue-100 p-2 rounded-md hover:bg-blue-200 mb-2">
            Diagnósticos:
          </summary>
          <div className="border-b ">
            <label className="flex items-center justify-between font-medium mb-1">
              Diagnósticos:
              <button
                type="button"
                onClick={() => handleAddItem("diagnoses")}
                className="text-blue-500"
              >
                <FaPlus />
              </button>
            </label>
            {(historial.diagnoses || []).map((diagnosis, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => handleInputChange(e, "diagnoses", index)}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Diagnóstico"
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
          </div>
        </details>

        {/* Tratamientos */}
        <details className="border-b">
          <summary className="text-azul cursor-pointer font-semibold bg-blue-100 p-2 rounded-md hover:bg-blue-200 mb-2">
            Tratamientos:
          </summary>
          <div className="border-b ">
            <label className="flex items-center justify-between font-medium mb-1">
              Tratamientos:
              <button
                type="button"
                onClick={() => handleAddItem("treatments")}
                className="text-blue-500"
              >
                <FaPlus />
              </button>
            </label>
            {(historial.treatments || []).map((treatment, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="date"
                  value={formatDate(treatment.treatmentDate) || ""}
                  onChange={(e) =>
                    handleInputChange(e, "treatments", index, "treatmentDate")
                  }
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  value={treatment.urlDocTreatment || ""}
                  onChange={(e) =>
                    handleInputChange(e, "treatments", index, "urlDocTreatment")
                  }
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Documento"
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
          </div>
        </details>

        {/* Seguimientos */}
        <details className="border-b">
          <summary className="text-azul cursor-pointer font-semibold bg-blue-100 p-2 rounded-md hover:bg-blue-200 mb-2">
            Seguimientos:
          </summary>
          <div className="border-b ">
            <label className="flex items-center justify-between font-medium mb-1">
              Seguimientos:
              <button
                type="button"
                onClick={() => handleAddItem("followUps")}
                className="text-blue-500"
              >
                <FaPlus />
              </button>
            </label>
            {(historial.followUps || []).map((followUp, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="date"
                  value={formatDate(followUp.followUpDate) || ""}
                  onChange={(e) =>
                    handleInputChange(e, "followUps", index, "followUpDate")
                  }
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  value={followUp.followUpNotes || ""}
                  onChange={(e) =>
                    handleInputChange(e, "followUps", index, "followUpNotes")
                  }
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Notas"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem("followUps", index)}
                  className="text-red-500"
                >
                  <FaMinus />
                </button>
              </div>
            ))}
          </div>
        </details>

        {/* Órdenes */}
        <details className="border-b">
          <summary className="text-azul cursor-pointer font-semibold bg-blue-100 p-2 rounded-md hover:bg-blue-200 mb-2">
            Órdenes:
          </summary>
          <div className="border-b ">
            <label className="flex items-center justify-between font-medium mb-1">
              Órdenes:
              <button
                type="button"
                onClick={() => handleAddItem("orders")}
                className="text-blue-500"
              >
                <FaPlus />
              </button>
            </label>
            {(historial.orders || []).map((order, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="date"
                  value={formatDate(order.ordersDate) || ""}
                  onChange={(e) =>
                    handleInputChange(e, "orders", index, "ordersDate")
                  }
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  value={order.urlDocOrders || ""}
                  onChange={(e) =>
                    handleInputChange(e, "orders", index, "urlDocOrders")
                  }
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Documento"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem("orders", index)}
                  className="text-red-500"
                >
                  <FaMinus />
                </button>
              </div>
            ))}
          </div>
        </details>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExamenesLaboratorioEditar;
