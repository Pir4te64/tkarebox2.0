// src/services/profileAdminGET.js
import axios from "axios";
import { API } from "../../utils/Api";

/**
 * Realiza una petición GET al endpoint definido en `API.PROFILE`, usando el token de localStorage.
 * @returns {Promise<any>} Datos del perfil si la petición es exitosa.
 * @throws {Error} Error si la petición falla o no hay token.
 */
export async function profileAdminGET() {
  // 1. Obtener el token de localStorage
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error(
      "No se encontró el token de autenticación en localStorage."
    );
  }

  // 2. Configurar Axios
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    timeout: 10000, // 10 segundos de timeout (opcional)
  };

  // 3. Petición GET
  const response = await axios.get(API.PROFILE, config);

  // Verificar si la API envía un `success: true`
  if (!response.data.success) {
    throw new Error(
      response.data.message || "Error desconocido en el servidor."
    );
  }

  // 4. Retornar la data relevante
  return response.data.body;
}
