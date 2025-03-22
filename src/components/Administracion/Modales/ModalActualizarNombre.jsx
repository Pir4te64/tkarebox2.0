// src/components/ModalActualizarNombre.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../utils/Api";

/**
 * Modal para actualizar el nombre de un usuario.
 *
 * @param {boolean} isOpen - Controla si el modal está abierto.
 * @param {function} onClose - Función para cerrar el modal.
 * @param {{name: string; document: string}} user - Datos actuales del usuario (opcional).
 * @param {function} reloadProfile - Función para recargar el perfil tras un update exitoso.
 */
const ModalActualizarNombre = ({ isOpen, onClose, user, reloadProfile }) => {
  // Estados para manejar la lógica del formulario y feedback
  const [newName, setNewName] = useState("");
  const [feedback, setFeedback] = useState(null); // { status: 'success'|'error', message: string }
  // Al abrir el modal, inicializa o limpia estados
  useEffect(() => {
    if (isOpen) {
      setNewName(user?.name || "");
      setFeedback(null);
    }
  }, [isOpen, user]);

  // Cierra modal y, si fue exitoso, recarga perfil
  const handleFeedbackClose = () => {
    if (feedback?.status === "success") {
      reloadProfile();
    }
    onClose();
  };

  // Acción al hacer clic en Actualizar
  const handleUpdate = async () => {
    // Validación básica
    if (!newName.trim()) {
      setFeedback({
        status: "error",
        message: "El nombre no puede estar vacío",
      });
      return;
    }

    try {
      // Obtener token desde localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error(
          "No se encontró el token de autenticación en localStorage."
        );
      }

      // Petición PUT con Axios
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Nota: Ajusta API.UPDATE_USER según tu backend.
      const response = await axios.put(
        API.UPDATE_USER,
        {
          name: newName.trim(),
          document: user?.document,
          pseudonym: user?.document,
        },
        config
      );

      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }

      // Si todo va bien:
      setFeedback({
        status: "success",
        message: "La información del usuario se actualizó correctamente.",
      });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      setFeedback({
        status: "error",
        message:
          error?.response?.data?.message ||
          error.message ||
          "Ocurrió un error al actualizar.",
      });
    }
  };

  // Si el modal no está abierto, no renderizamos nada en el DOM
  if (!isOpen) return null;

  return (
    // Contenedor de modal
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm">
        {feedback ? (
          // Muestra feedback (éxito o error)
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4 text-green-600">
              {feedback.status === "success" ? "¡Datos actualizados!" : "Error"}
            </h2>
            <p className="mb-6 text-black">{feedback.message}</p>
            <button
              onClick={handleFeedbackClose}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Aceptar
            </button>
          </div>
        ) : (
          // Formulario para actualizar
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Actualizar Datos del Usuario
            </h2>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Nombre Actual
            </label>
            <input
              type="text"
              readOnly
              className="w-full mb-3 border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-700"
              value={user?.name || ""}
            />

            <label className="block mb-1 text-sm font-medium text-gray-700">
              Nuevo Nombre
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-azul"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Actualizar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalActualizarNombre;
