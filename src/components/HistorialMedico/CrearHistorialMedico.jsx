import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa"; // Iconos de agregar y eliminar
import { formatDatePrincipal } from "./Fechas";

const CrearHistorialMedico = ({ handleGuardar }) => {
  // Inicializamos el estado del formulario
  const [historial, setHistorial] = useState({
    date: [],
    specialty: "",
    treatingPhysician: "",
    originalSymptoms: [],
    diagnoses: [],
    treatments: [],
    followUps: [],
    orders: [],
  });

  // Función para formatear la fecha en el formato yyyy-MM-dd
  const formatDate = (date) => {
    const year = date[0];
    const month = date[1] < 10 ? `0${date[1]}` : date[1];
    const day = date[2] < 10 ? `0${date[2]}` : date[2];
    return `${year}-${month}-${day}`;
  };

  // Función para convertir la fecha del input de tipo date a un array [year, month, day]
  const convertToDateArray = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return [year, month, day];
  };

  // Actualiza un campo simple del historial
  const updateField = (field, value) => {
    setHistorial((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Actualiza un valor dentro de un array (por ejemplo, síntomas o diagnósticos)
  const updateArrayField = (field, index, value) => {
    const updatedArray = [...historial[field]];
    updatedArray[index] = value;
    setHistorial((prevState) => ({
      ...prevState,
      [field]: updatedArray,
    }));
  };

  // Actualiza un tratamiento dentro del array de tratamientos
  const updateTreatment = (index, field, value) => {
    const updatedTreatments = [...historial.treatments];
    updatedTreatments[index] = {
      ...updatedTreatments[index],
      [field]: value,
    };
    setHistorial((prevState) => ({
      ...prevState,
      treatments: updatedTreatments,
    }));
  };

  // Actualiza un seguimiento dentro del array de seguimientos
  const updateFollowUp = (index, field, value) => {
    const updatedFollowUps = [...historial.followUps];
    updatedFollowUps[index] = {
      ...updatedFollowUps[index],
      [field]: value,
    };
    setHistorial((prevState) => ({
      ...prevState,
      followUps: updatedFollowUps,
    }));
  };

  // Actualiza una orden dentro del array de órdenes
  const updateOrder = (index, field, value) => {
    const updatedOrders = [...historial.orders];
    updatedOrders[index] = {
      ...updatedOrders[index],
      [field]: value,
    };
    setHistorial((prevState) => ({
      ...prevState,
      orders: updatedOrders,
    }));
  };

  // Función para agregar un nuevo ítem al array
  const handleAddItem = (field) => {
    const updatedArray = [...historial[field], ""];
    setHistorial((prevState) => ({
      ...prevState,
      [field]: updatedArray,
    }));
  };

  // Función para eliminar un ítem del array
  const handleRemoveItem = (field, index) => {
    const updatedArray = historial[field].filter((_, i) => i !== index);
    setHistorial((prevState) => ({
      ...prevState,
      [field]: updatedArray,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Antes de guardar, formateamos la fecha como se hizo en la función handleActualizar
    const formattedDate = formatDatePrincipal(historial.date);
    const updatedHistorial = { ...historial, date: formattedDate };

    handleGuardar(updatedHistorial); // Pasamos los datos formateados a la función handleGuardar
  };

  return (
    <form
      className="space-y-6 mt-10 bg-blue-50 p-6 rounded-lg shadow-lg"
      onSubmit={handleSubmit} // Cambiar el evento a 'handleSubmit'
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
              value={historial.date ? formatDatePrincipal(historial.date) : ""}
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
              value={historial.specialty || ""}
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
              value={historial.treatingPhysician || ""}
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
        <div className="space-y-2">
          {historial.originalSymptoms?.map((symptom, index) => (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="text"
                value={symptom || ""}
                placeholder="Síntoma"
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
                <FaMinus />
              </button>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleAddItem("originalSymptoms")}
              className="text-azul bg-blue-100 hover:bg-blue-200 p-2 my-2 rounded-md"
            >
              <FaPlus />
            </button>
            <span className="text-azul">Agregar síntoma</span>
          </div>
        </div>

        {/* Diagnósticos */}
        <div className="space-y-2">
          {historial.diagnoses?.map((diagnosis, index) => (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="text"
                value={diagnosis || ""}
                placeholder="Diagnóstico"
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
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleAddItem("diagnoses")}
              className="text-azul bg-blue-100 hover:bg-blue-200 p-2 my-2 rounded-md"
            >
              <FaPlus />
            </button>
            <span className="text-azul">Agregar diagnóstico</span>
          </div>
        </div>
      </details>

      {/* Agrupación de Tratamientos, Seguimientos y Órdenes */}
      <details className="border-b-2 pb-4">
        <summary className="text-azul cursor-pointer font-semibold bg-blue-100 p-2 rounded-md hover:bg-blue-200 mb-2">
          Tratamientos, Seguimientos y Órdenes:
        </summary>

        {/* Tratamientos */}
        <div className="space-y-2">
          {historial.treatments?.map((treatment, index) => (
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
                placeholder="Fecha del tratamiento"
              />
              <input
                type="text"
                value={treatment.urlDocTreatment || ""}
                onChange={(e) =>
                  updateTreatment(index, "urlDocTreatment", e.target.value)
                }
                className="w-full border border-blue-300 rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-blue-500"
                placeholder="URL Tratamiento"
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
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleAddItem("treatments")}
              className="text-blue-600 bg-blue-100 hover:bg-blue-200 p-2 my-2 rounded-md"
            >
              <FaPlus />
            </button>
            <span className="text-azul">Agregar tratamiento</span>
          </div>
        </div>

        {/* Seguimientos */}
        <div className="space-y-2">
          {historial.followUps?.map((followUp, index) => (
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
                placeholder="Fecha de seguimiento"
              />
              <input
                type="text"
                value={followUp.followUpNotes || ""}
                onChange={(e) =>
                  updateFollowUp(index, "followUpNotes", e.target.value)
                }
                className="w-full border border-blue-300 rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-blue-500"
                placeholder="URl Seguimiento"
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
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleAddItem("followUps")}
              className="text-blue-600 bg-blue-100 hover:bg-blue-200 p-2 my-2 rounded-md"
            >
              <FaPlus />
            </button>
            <span className="text-azul">Agregar seguimiento</span>
          </div>
        </div>

        {/* Órdenes */}
        <div className="space-y-2">
          {historial.orders?.map((order, index) => (
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
                placeholder="Fecha de la orden"
              />
              <input
                type="text"
                value={order.urlDocOrders || ""}
                onChange={(e) =>
                  updateOrder(index, "urlDocOrders", e.target.value)
                }
                className="w-full border border-blue-300 rounded px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-blue-500"
                placeholder="URL Orden"
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
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleAddItem("orders")}
              className="text-blue-600 bg-blue-100 hover:bg-blue-200 p-2 my-2 rounded-md"
            >
              <FaPlus />
            </button>
            <span className="text-azul">Agregar orden</span>
          </div>
        </div>
      </details>

      {/* Botón para guardar */}
      <div className="">
        <button
          type="submit"
          className="w-full bg-azul hover:bg-azul/80 text-white py-3 rounded-lg font-semibold transition duration-200"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default CrearHistorialMedico;
