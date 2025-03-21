import React from "react";

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

  return (
    <form className="space-y-6" onSubmit={handleActualizar}>
      {" "}
      {/* Llamamos a handleActualizar aquí */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Editar Historial Médico
      </h1>
      {/* Datos */}
      <details className="border-b-2 pb-4">
        <summary className="text-blue-500 cursor-pointer font-semibold">
          Datos
        </summary>
        <div>
          {/* Fecha */}
          <div>
            <label className="block font-medium mb-1">Fecha:</label>
            <input
              type="date"
              value={date || ""}
              onChange={(e) => updateField("date", e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
            />
          </div>
          {/* Especialidad */}
          <div>
            <label className="block font-medium mb-1">Especialidad:</label>
            <input
              type="text"
              value={specialty || ""}
              onChange={(e) => updateField("specialty", e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
            />
          </div>
          {/* Médico tratante */}
          <div>
            <label className="block font-medium mb-1">Médico tratante:</label>
            <input
              type="text"
              value={treatingPhysician || ""}
              onChange={(e) => updateField("treatingPhysician", e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
            />
          </div>
        </div>
      </details>
      {/* Agrupación de Síntomas y Diagnósticos */}
      <details className="border-b-2 pb-4">
        <summary className="text-blue-500 cursor-pointer font-semibold">
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
              className="w-full border rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem("originalSymptoms", index)}
              className="text-red-500"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("originalSymptoms")}
          className="text-blue-500"
        >
          +
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
              className="w-full border rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem("diagnoses", index)}
              className="text-red-500"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("diagnoses")}
          className="text-blue-500"
        >
          +
        </button>
      </details>
      {/* Agrupación de Tratamientos, Seguimientos y Órdenes */}
      <details className="border-b-2 pb-4">
        <summary className="text-blue-500 cursor-pointer font-semibold">
          Tratamientos, Seguimientos y Órdenes:
        </summary>

        {/* Tratamientos */}
        {treatments?.map((treatment, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="date"
              value={treatment.treatmentDate?.join("-") || ""}
              onChange={(e) =>
                updateTreatment(
                  index,
                  "treatmentDate",
                  e.target.value.split("-")
                )
              }
              className="w-full border rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-indigo-500"
            />
            <input
              type="text"
              value={treatment.urlDocTreatment || ""}
              onChange={(e) =>
                updateTreatment(index, "urlDocTreatment", e.target.value)
              }
              className="w-full border rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem("treatments", index)}
              className="text-red-500"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("treatments")}
          className="text-blue-500"
        >
          +
        </button>

        {/* Seguimientos */}
        {followUps?.map((followUp, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="date"
              value={followUp.followUpDate?.join("-") || ""}
              onChange={(e) =>
                updateFollowUp(index, "followUpDate", e.target.value.split("-"))
              }
              className="w-full border rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-indigo-500"
            />
            <input
              type="text"
              value={followUp.followUpNotes || ""}
              onChange={(e) =>
                updateFollowUp(index, "followUpNotes", e.target.value)
              }
              className="w-full border rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem("followUps", index)}
              className="text-red-500"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("followUps")}
          className="text-blue-500"
        >
          +
        </button>

        {/* Órdenes */}
        {orders?.map((order, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="date"
              value={order.ordersDate?.join("-") || ""}
              onChange={(e) =>
                updateOrder(index, "ordersDate", e.target.value.split("-"))
              }
              className="w-full border rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-indigo-500"
            />
            <input
              type="text"
              value={order.urlDocOrders || ""}
              onChange={(e) =>
                updateOrder(index, "urlDocOrders", e.target.value)
              }
              className="w-full border rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem("orders", index)}
              className="text-red-500"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("orders")}
          className="text-blue-500"
        >
          +
        </button>
      </details>
      {/* Botón para actualizar */}
      <div className="pt-6">
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-200"
        >
          Actualizar
        </button>
      </div>
    </form>
  );
};

export default FormularioHistorialMedico;
