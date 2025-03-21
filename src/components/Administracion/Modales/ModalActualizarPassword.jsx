// src/components/Modales/ModalActualizarPassword.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../utils/Api";

/**
 * Modal para actualizar la contraseña de un usuario.
 *
 * @param {boolean} isOpen - Controla si el modal está abierto.
 * @param {function} onClose - Función para cerrar el modal.
 * @param {string} userDocument - Documento (seudónimo) del usuario.
 * @param {function} reloadProfile - Función para recargar el perfil tras un update exitoso.
 */
export default function ModalActualizarPassword({
  isOpen,
  onClose,
  userDocument,
  reloadProfile,
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState(null); // { status: 'success' | 'error', message: string }

  // Al abrir el modal, limpia los campos y feedback
  useEffect(() => {
    if (isOpen) {
      setNewPassword("");
      setConfirmPassword("");
      setFeedback(null);
    }
  }, [isOpen]);

  // Cierra modal, si éxito → recarga perfil
  const handleFeedbackClose = () => {
    if (feedback?.status === "success") {
      reloadProfile();
    }
    onClose();
  };

  // Lógica para actualizar la contraseña
  const handleUpdatePassword = async () => {
    try {
      // Verificar campos vacíos
      if (!newPassword.trim() || !confirmPassword.trim()) {
        setFeedback({
          status: "error",
          message: "Todos los campos son obligatorios.",
        });
        return;
      }
      // Verificar que coincidan
      if (newPassword !== confirmPassword) {
        setFeedback({
          status: "error",
          message: "Las contraseñas no coinciden.",
        });
        return;
      }

      // Obtener token desde localStorage
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        throw new Error("No se encontró el token de autenticación.");
      }

      // Preparar cabeceras para Axios
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      // Petición PUT para actualizar la contraseña.
      // Ajusta API.UPDATE_PASSWORD a la URL real de tu backend
      const response = await axios.put(
        API.UPDATE_PASSWORD,
        {
          seudonimo: userDocument,
          password: newPassword.trim(),
          confirmPassword: confirmPassword.trim(),
          passwordMatching: true, // o como lo necesite tu backend
        },
        config
      );

      // Manejo de errores de respuesta
      if (response.status < 200 || response.status >= 300) {
        throw new Error(
          "Error en la respuesta del servidor al actualizar la contraseña."
        );
      }

      setFeedback({
        status: "success",
        message: "La contraseña se actualizó correctamente.",
      });
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      setFeedback({
        status: "error",
        message:
          error?.response?.data?.message ||
          error.message ||
          "Ocurrió un error al actualizar la contraseña.",
      });
    }
  };

  // Si el modal no está abierto, no se renderiza
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm">
        {feedback ? (
          // Vista de feedback (éxito o error)
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4 text-green-600">
              {feedback.status === "success" ? "¡Actualizado!" : "Error"}
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
          // Formulario para nueva contraseña
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Actualizar Contraseña
            </h2>

            <label className="block mb-1 text-sm font-medium text-gray-700">
              Nueva Contraseña
            </label>
            <input
              type="password"
              className="w-full mb-3 border border-gray-300 text-black rounded px-3 py-2 focus:outline-none focus:border-azul"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              className="w-full mb-4 border border-gray-300 text-black rounded px-3 py-2 focus:outline-none focus:border-azul"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdatePassword}
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
}
