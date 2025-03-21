// src/components/ContactosPUT.js
import axios from "axios";
import { API } from "../../utils/Api"; // Ajusta la ruta según tu estructura

/**
 * Actualiza (PUT) un contacto de paciente con los datos en contactData.
 * TODO: La API NO requiere ID en la URL, sino en el body.
 * Se asume que contactData incluye la propiedad "id" si la API la necesita,
 * o que la API no usa ID para identificar el contacto, según tu backend.
 *
 * @param {Object} contactData - Objeto que contiene los campos a actualizar:
 *   {
 *     "id": "string",         // si tu backend lo espera en el body
 *     "name": "string",
 *     "phone": "string",
 *     "email": "string",
 *     "observation": "string"
 *   }
 * @returns {Promise<any>} La respuesta de la API.
 * @throws {Error} Si hay un problema en la solicitud o falta el token.
 */
export async function PACIENTE_CONTACTO_PUT(contactData) {
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

    // 1) NO usamos `contactData.id` en la URL,
    //    la API recibe todo el objeto en el body.
    const url = API.PACIENTE_CONTACTO_PUT; // Por ejemplo: "/api/contact/update"

    // 2) Hacemos PUT pasando el objeto completo en el body
    const response = await axios.put(url, contactData, config);

    // 3) Ajusta la validación según tu API.
    //    Aquí se asume que response.data es algo como { success: true, ... }
    if (response.status !== 200 && !response.data?.success) {
      throw new Error(
        response.data?.message || `Error en la solicitud: ${response.status}`
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error al actualizar contacto:", error);
    throw error;
  }
}
