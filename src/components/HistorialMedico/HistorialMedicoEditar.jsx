import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa"; // Importar los iconos
import { formatDatePrincipal } from "./Fechas";
const FormularioHistorialMedico = ({
  historial,
  handleAddItem,
  handleRemoveItem,
  updateField,
  updateArrayField,
  updateTreatment,
  updateFollowUp,
  updateOrder,
  handleActualizar, // Recibimos handleActualizar como prop
}) => {
  const {
    originalSymptoms,
    diagnoses,
    treatments,
    followUps,
    orders,
    date,
    specialty,
    treatingPhysician,
  } = historial;

  // Función para formatear la fecha en el formato yyyy-MM-dd (para mostrar en el input)
  const formatDate = (date) => {
    const year = date[0];
    const month = date[1] < 10 ? `0${date[1]}` : date[1]; // Asegurarnos de que el mes tenga dos dígitos
    const day = date[2] < 10 ? `0${date[2]}` : date[2]; // Asegurarnos de que el día tenga dos dígitos
    return `${year}-${month}-${day}`;
  };

  // Función para convertir la fecha del input de tipo date a un array [year, month, day]
  const convertToDateArray = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return [year, month, day];
  };

  return (
    <form
      className="space-y-6 mt-20 bg-blue-50 p-6 rounded-lg shadow-lg"
      onSubmit={handleActualizar}
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
              value={date ? formatDatePrincipal(date) : ""}
              onChange={(e) =>
                updateField("date", convertToDateArray(e.target.value))
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
              value={specialty || ""}
              onChange={(e) => updateField("specialty", e.target.value)}
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
              value={treatingPhysician || ""}
              onChange={(e) => updateField("treatingPhysician", e.target.value)}
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
        {originalSymptoms?.map((symptom, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="text"
              value={symptom || ""}
              onChange={(e) =>
                updateArrayField("originalSymptoms", index, e.target.value)
              }
              className="w-full border border-azul rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-azul"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem("originalSymptoms", index)}
              className="text-red-500"
            >
              <FaMinus /> {/* Icono de eliminación */}
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("originalSymptoms")}
          className="text-azul bg-blue-100 hover:bg-blue-200 p-2 my-2 rounded-md"
        >
          <FaPlus /> {/* Icono de adición */}
        </button>

        {/* Diagnósticos */}
        {diagnoses?.map((diagnosis, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="text"
              value={diagnosis || ""}
              onChange={(e) =>
                updateArrayField("diagnoses", index, e.target.value)
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
      <details className="border-b-2 pb-4">
        <summary className="text-azul cursor-pointer font-semibold bg-blue-100 p-2 rounded-md hover:bg-blue-200 mb-2">
          Tratamientos, Seguimientos y Órdenes:
        </summary>

        {/* Tratamientos */}
        {treatments?.map((treatment, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="date"
              value={
                treatment.treatmentDate
                  ? formatDate(treatment.treatmentDate)
                  : ""
              }
              onChange={(e) =>
                updateTreatment(
                  index,
                  "treatmentDate",
                  convertToDateArray(e.target.value)
                )
              }
              className="w-full border border-blue-300 rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-blue-500"
            />
            <input
              type="text"
              value={treatment.urlDocTreatment || ""}
              onChange={(e) =>
                updateTreatment(index, "urlDocTreatment", e.target.value)
              }
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

        {/* Seguimientos */}
        {followUps?.map((followUp, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="date"
              value={
                followUp.followUpDate ? formatDate(followUp.followUpDate) : ""
              }
              onChange={(e) =>
                updateFollowUp(
                  index,
                  "followUpDate",
                  convertToDateArray(e.target.value)
                )
              }
              className="w-full border border-blue-300 rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-blue-500"
            />
            <input
              type="text"
              value={followUp.followUpNotes || ""}
              onChange={(e) =>
                updateFollowUp(index, "followUpNotes", e.target.value)
              }
              className="w-full border border-blue-300 rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-blue-500"
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
        <button
          type="button"
          onClick={() => handleAddItem("followUps")}
          className="text-blue-600 bg-blue-100 hover:bg-blue-200 p-2 my-2 rounded-md"
        >
          <FaPlus />
        </button>

        {/* Órdenes */}
        {orders?.map((order, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="date"
              value={order.ordersDate ? formatDate(order.ordersDate) : ""}
              onChange={(e) =>
                updateOrder(
                  index,
                  "ordersDate",
                  convertToDateArray(e.target.value)
                )
              }
              className="w-full border border-blue-300 rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-blue-500"
            />
            <input
              type="text"
              value={order.urlDocOrders || ""}
              onChange={(e) =>
                updateOrder(index, "urlDocOrders", e.target.value)
              }
              className="w-full border border-blue-300 rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-blue-500"
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
        <button
          type="button"
          onClick={() => handleAddItem("orders")}
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
