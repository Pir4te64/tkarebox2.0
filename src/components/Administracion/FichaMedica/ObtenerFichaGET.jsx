import axios from "axios";
import { API } from "../../../utils/Api";

/**
 * Realiza una petición GET para obtener la ficha del usuario,
 * usando el id pasado como parámetro.
 * @param {string | number} userId - El id del usuario.
 * @returns {Promise<any>} La ficha obtenida.
 */
export async function ObtenerFichaGET(userId) {
  try {
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

    // Se asume que el endpoint es algo como API.FICHA/{userId}
    const response = await axios.get(
      `${API.DATA_REGISTER_GET}/${userId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener la ficha:", error.message);
  }
}
