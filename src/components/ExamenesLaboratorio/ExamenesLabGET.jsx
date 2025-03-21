// src/services/ExamenesLabGET.js
import axios from "axios";
import { API } from "../../utils/Api";

/**
 * Realiza una petición GET para obtener exámenes de laboratorio,
 * enviando userDataId y rango de fechas en formato YYYY-MM-DD.
 * @param {string} userDataId - El userDataId de la ficha que deseas consultar
 * @param {string} fechaDesde - Fecha inicial (YYYY-MM-DD)
 * @param {string} fechaHasta - Fecha final (YYYY-MM-DD)
 * @returns {Promise<any>} Respuesta de la API.
 */
export async function examenesLabGET(userDataId, fechaDesde, fechaHasta) {
  try {
    // 1) Obtener el token de localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }
    // 2) Convertir las fechas a YYYY-MM-DD (en caso de necesitar manipularlo)
    const startDate = formatearFecha(fechaDesde);
    const endDate = formatearFecha(fechaHasta);

    // 3) Configurar Axios sin incluir query params en la URL
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        userDataId,
        dateFrom: startDate,
        dateTo: endDate,
      },
    };

    // 4) Petición GET, sin concatenar manualmente los parámetros a la URL
    const response = await axios.get(
      `${API.CHATGPT_CONSULTA}/laboratory`,
      config
    );

    // 5) Verificar la respuesta
    if (response.status !== 200) {
      throw new Error(
        response.data?.message || `Error en la solicitud: ${response.status}`
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error al obtener exámenes de laboratorio:", error);
    throw error;
  }
}

/**
 * Convierte una fecha de entrada en formato YYYY-MM-DD.
 * Si la fecha ya viene en YYYY-MM-DD, simplemente la retorna,
 * o puedes manejar validaciones extra.
 * @param {string} fecha - Fecha de entrada (puede ser '2023-05-12', etc.)
 * @returns {string} Fecha en formato YYYY-MM-DD
 */
function formatearFecha(fecha) {
  if (!fecha) return "";
  return fecha;
}
