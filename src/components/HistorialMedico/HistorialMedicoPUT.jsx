// src/api/updateHistorialMedico.js
import axios from "axios";
import { API } from "../../utils/Api";

/**
 * Envía una petición PUT para actualizar el historial médico.
 *
 * @param {Object} historial - El objeto con los datos actualizados (debe incluir `id` dentro del objeto).
 * @returns {Promise<any>} La respuesta de la API.
 */
export const updateHistorialMedico = async (historial) => {
  console.log("Historial a actualizar:", historial);

  try {
    // Validar token
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    // Validar datos de historial
    if (!historial || !historial.id) {
      throw new Error("Datos de historial incompletos");
    }

    // Configuración de los headers con el token de autorización
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Enviar solicitud PUT a la API pasando el historial completo (ya tiene el `id` y NO necesita eliminar el `profileId` aquí)
    const response = await axios.put(
      `${API.HISTORAL_CLINICO_PUT}`, // Se pasa el historial completo, no eliminamos ningún campo.
      historial, // Enviamos directamente el objeto historial, sin necesidad de manipularlo
      config
    );

    // Retornar la respuesta de la API si la solicitud es exitosa
    return response.data;
  } catch (error) {
    // Manejo de errores
    console.error("Error al actualizar el historial médico:", error);
    if (error.response) {
      // Error específico de la respuesta de la API
      const errorMessage = error.response.data.message || "Error desconocido";
      throw new Error(errorMessage);
    } else {
      // Error general (por ejemplo, problemas de red)
      throw new Error(
        "Error de conexión. Por favor, inténtelo de nuevo más tarde."
      );
    }
  }
};
