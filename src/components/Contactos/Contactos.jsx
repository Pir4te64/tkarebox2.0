// src/components/Contactos.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ContactosGET from "./ContactosGET";
import { PACIENTE_CONTACTO_POST } from "./ContactosPOST";

const Contactos = () => {
  const { state: profile } = useLocation();

  // Estados del nuevo contacto
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [observation, setObservation] = useState("");

  // Manejo de errores y éxito
  const [creationError, setCreationError] = useState("");
  const [creationSuccess, setCreationSuccess] = useState("");

  // Clave para forzar el remontaje de ContactosGET
  const [reloadKey, setReloadKey] = useState(0);

  const handleCreateContact = async () => {
    if (!profile || !profile.id) {
      setCreationError("No se recibió un ID de usuario válido.");
      return;
    }

    try {
      setCreationError("");
      setCreationSuccess("");

      const contactData = {
        userId: profile.id,
        name,
        phone,
        email,
        observation,
      };

      await PACIENTE_CONTACTO_POST(contactData);
      setCreationSuccess("¡Contacto creado con éxito!");

      // Limpiar campos del formulario
      setName("");
      setPhone("");
      setEmail("");
      setObservation("");

      // Incrementar reloadKey para "remontar" ContactosGET
      setReloadKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error al crear contacto:", error);
      setCreationError(error.message || "Error al crear el contacto.");
    }
  };

  if (!profile || !profile.id) {
    return (
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Contactos</h1>
        <p className="text-red-500">No se recibió el ID del usuario.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <details className="bg-azul text-white shadow-lg rounded-lg p-3 mb-8 mt-20">
        <summary className="cursor-pointer font-bold text-lg text-center">
          Crear/Editar Contactos
        </summary>

        {/* Formulario para crear un nuevo contacto */}
        <div className="space-y-3 mb-6">
          {/* Nombre */}
          <div>
            <label className="block text-white font-medium mb-1">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa el nombre"
            />
          </div>
          {/* Teléfono */}
          <div>
            <label className="block text-white font-medium mb-1">
              Teléfono
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa el teléfono"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-white font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa el email"
            />
          </div>
          {/* Observación */}
          <div>
            <label className="block text-white font-medium mb-1">
              Observación
            </label>
            <textarea
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa una observación"
            />
          </div>
          <button
            onClick={handleCreateContact}
            className="w-full bg-azul border-2 border-white text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Crear Contacto
          </button>
          {creationError && (
            <p className="text-red-500 text-center mt-2">{creationError}</p>
          )}
          {creationSuccess && (
            <p className="text-green-600 text-center mt-2">{creationSuccess}</p>
          )}
        </div>

        {/* Lista de contactos existentes */}
        <ContactosGET userId={profile.id} key={reloadKey} />
      </details>
    </div>
  );
};

export default Contactos;
