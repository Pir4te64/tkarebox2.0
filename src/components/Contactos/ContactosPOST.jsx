// src/services/pacienteContactoPOST.js
import axios from "axios";
import { API } from "../../utils/Api"; // Ajusta la ruta según tu estructura

/**
 * Envía los datos de un contacto de paciente (POST).
 * @param {Object} contactData - Datos del contacto.
 * @param {number} contactData.userId - ID del usuario.
 * @param {string} contactData.name - Nombre del contacto.
 * @param {string} contactData.phone - Teléfono del contacto.
 * @param {string} contactData.email - Email del contacto.
 * @param {string} contactData.observation - Observaciones del contacto.
 * @returns {Promise<any>} Respuesta de la API si todo va bien.
 * @throws {Error} Si hay un problema en la solicitud o falta el token.
 */
export async function PACIENTE_CONTACTO_POST(contactData) {
  try {
    // 1. Obtener el token desde localStorage
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      throw new Error("No se encontró el token de autenticación.");
    }

    // 2. Configurar la petición con axios
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    // 3. Realizar la petición POST
    const response = await axios.post(
      API.PACIENTE_CONTACTO_POST,
      contactData,
      config
    );

    // 4. Manejo de la respuesta
    // Asumiendo que tu API regresa un objeto con "success" y/o "message"
    // Si tu API maneja otro formato, ajusta esta lógica
    if (response.status !== 200 && !response.data?.success) {
      throw new Error(
        response.data?.message || `Error en la solicitud: ${response.status}`
      );
    }

    // 5. Retornar la respuesta exitosa
    return response.data;
  } catch (error) {
    console.error("Error al enviar contacto:", error);
    throw error;
  }
}
