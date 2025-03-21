// src/services/pacienteContactoDELETE.js
import axios from "axios";
import { API } from "../../utils/Api"; // Ajusta la ruta según tu estructura

/**
 * Elimina (DELETE) un contacto de paciente.
 * @param {string|number} contactId - El ID del contacto que se desea eliminar.
 * @returns {Promise<any>} Respuesta de la API si todo va bien.
 * @throws {Error} Si hay un problema en la solicitud o falta el token.
 */
export async function PACIENTE_CONTACTO_DELETE(contactId) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Suponiendo que la URL es algo como: API.PACIENTE_CONTACTO_DELETE + "/{contactId}"
    const url = `${API.PACIENTE_CONTACTO_DELETE}/${contactId}`;

    const response = await axios.delete(url, config);

    if (response.status !== 200 && !response.data?.success) {
      throw new Error(
        response.data?.message || `Error en la solicitud: ${response.status}`
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error al eliminar contacto:", error);
    throw error;
  }
}
