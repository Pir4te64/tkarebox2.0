// src/components/ContactosGET.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../utils/Api"; // Ajusta la ruta si es necesario
import { PACIENTE_CONTACTO_PUT } from "./ContactosPUT";
import { PACIENTE_CONTACTO_DELETE } from "./ContactosDELETE";

async function obtenerContactos(userId) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No se encontró el token de autenticación");
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Suponiendo que el endpoint es API.PACIENTE_CONTACTO_GET_ALL/{userId}
  const response = await axios.get(
    `${API.PACIENTE_CONTACTO_GET_ALL}/${userId}`,
    config
  );
  return response.data; // Array de contactos
}

const ContactosGET = ({ userId }) => {
  const [contactos, setContactos] = useState([]); // Originales
  const [editableContacts, setEditableContacts] = useState([]); // Para edición
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContactos = async () => {
      try {
        const data = await obtenerContactos(userId);
        console.log("Contactos recibidos:", data);
        setContactos(data);
        setEditableContacts(data); // Copiamos los datos al estado editable
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchContactos();
    } else {
      setError("No se proporcionó un userId válido.");
      setLoading(false);
    }
  }, [userId]);

  // Maneja cambios en los inputs
  const handleChange = (index, field, value) => {
    setEditableContacts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Simula guardar cambios por contacto
  const handleSave = async (contactIndex) => {
    const updatedContact = editableContacts[contactIndex];
    console.log("Guardar cambios de contacto:", updatedContact);

    try {
      const response = await PACIENTE_CONTACTO_PUT(updatedContact);
      console.log("Contacto actualizado con éxito:", response);
      // Aquí podrías refrescar la lista si lo deseas
    } catch (error) {
      console.error("Error al actualizar contacto:", error);
      // Mostrar mensaje de error si es necesario
    }
  };

  const handleDelete = async (contactId) => {
    try {
      const response = await PACIENTE_CONTACTO_DELETE(contactId);
      console.log("Contacto eliminado con éxito:", response);
      // Actualizamos la lista local filtrando el contacto eliminado
      setEditableContacts((prev) => prev.filter((c) => c.id !== contactId));
      setContactos((prev) => prev.filter((c) => c.id !== contactId));
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-4">Cargando contactos...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500 mt-4">{error}</p>;
  }
  if (!contactos || contactos.length === 0) {
    return <p className="text-center mt-4">No se encontraron contactos.</p>;
  }

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-4 text-black">
        Contactos del Usuario
      </h2>
      {/* Iteramos sobre los contactos y los envolvemos en un details */}
      {editableContacts.map((contacto, index) => (
        <details
          key={contacto.id}
          className="mb-4 border border-gray-200 rounded"
        >
          <summary className="px-4 py-2 bg-gray-100 text-black font-semibold cursor-pointer">
            Contacto #{index + 1}: {contacto.name}
          </summary>
          <div className="p-4">
            {/* Nombre */}
            <label className="block mb-1 font-medium text-black">Nombre</label>
            <input
              type="text"
              value={contacto.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 mb-2 text-black"
            />

            {/* Teléfono */}
            <label className="block mb-1 font-medium text-black">
              Teléfono
            </label>
            <input
              type="text"
              value={contacto.phone}
              onChange={(e) => handleChange(index, "phone", e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 mb-2 text-black"
            />

            {/* Email */}
            <label className="block mb-1 font-medium text-black">Email</label>
            <input
              type="email"
              value={contacto.email}
              onChange={(e) => handleChange(index, "email", e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 mb-2 text-black"
            />

            {/* Observación */}
            <label className="block mb-1 font-medium text-black">
              Observación
            </label>
            <textarea
              value={contacto.observation}
              onChange={(e) =>
                handleChange(index, "observation", e.target.value)
              }
              className="w-full border border-gray-300 rounded px-2 py-1 mb-2 text-black"
            />

            <div className="flex gap-2">
              <button
                onClick={() => handleSave(index)}
                className="bg-azul text-white py-1 px-4 rounded hover:bg-blue-600 transition"
              >
                Guardar Cambios
              </button>
              <button
                onClick={() => handleDelete(contacto.id)}
                className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
};

export default ContactosGET;
