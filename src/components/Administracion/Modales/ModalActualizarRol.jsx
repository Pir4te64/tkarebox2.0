// src/components/ModalActualizarRol.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../utils/Api";

/**
 * Modal para actualizar el rol de un usuario.
 *
 * @param {boolean} isOpen - Controla si el modal está abierto.
 * @param {function} onClose - Función para cerrar el modal.
 * @param {{tipoUsuario: string; seudonimo: string}} user - Datos actuales del usuario (opcional).
 * @param {function} reloadProfile - Función para recargar el perfil tras un update exitoso.
 */
const ModalActualizarRol = ({ isOpen, onClose, user, reloadProfile }) => {
  const [newRol, setNewRol] = useState("");
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFeedback(null);
      // Determina el rol opuesto
      if (user?.tipoUsuario === "D") {
        setNewRol("A");
      } else {
        setNewRol("D");
      }
    }
  }, [isOpen, user]);

  const handleFeedbackClose = () => {
    if (feedback?.status === "success") {
      reloadProfile();
    }
    onClose();
  };

  const handleUpdate = async () => {
    if (!newRol.trim()) {
      setFeedback({
        status: "error",
        message: "El rol no puede estar vacío",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error(
          "No se encontró el token de autenticación en localStorage."
        );
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Ajustar la URL y el body según tu backend
      const response = await axios.put(
        `${API.UPDATE_DEPENDIENTE}?seudonimo=${
          user?.seudonimo
        }&role=${newRol.trim()}`,
        {},
        config
      );

      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }

      setFeedback({
        status: "success",
        message: "El rol del usuario se actualizó correctamente.",
      });
    } catch (error) {
      console.error("Error al actualizar rol:", error);
      setFeedback({
        status: "error",
        message:
          error?.response?.data?.message ||
          error.message ||
          "Ocurrió un error al actualizar el rol.",
      });
    }
  };

  if (!isOpen) return null;

  const rolActualTexto =
    user?.tipoUsuario === "D" ? "Dependiente" : "Apoderado";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm">
        {feedback ? (
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
          <>
            <h2 className="text-xl  mb-4 text-center">
              Actualizar Rol del Usuario
            </h2>
            <p className="text-sm mb-4 text-gray-700 text-center">
              Rol Actual:{" "}
              <span className="font-semibold">{rolActualTexto}</span>
            </p>
            <select
              className="w-full mb-4 border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-azul"
              value={newRol}
              onChange={(e) => setNewRol(e.target.value)}
            >
              {user?.tipoUsuario === "D" ? (
                <option value="A">Cambiar a Apoderado</option>
              ) : (
                <option value="D">Cambiar a Dependiente</option>
              )}
            </select>

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

export default ModalActualizarRol;
