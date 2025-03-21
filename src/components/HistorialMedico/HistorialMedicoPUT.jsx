// src/api/updateHistorialMedico.js
import axios from "axios";
import { API } from "../../utils/Api";

/**
 * Envía una petición PUT para actualizar el historial médico.
 * Se espera un objeto 'historial' con la estructura:
 * {
 *    id: string,
 *    userDataId: string,
 *    date: string,
 *    specialty: string,
 *    treatingPhysician: string,
 *    originalSymptoms: [string],
 *    diagnoses: [string],
 *    treatments: [{ treatmentDate: string, urlDocTreatment: string }],
 *    followUps: [{ followUpDate: string, followUpNotes: string }],
 *    orders: [{ ordersDate: string, urlDocOrders: string }]
 * }
 *
 * La función elimina el campo 'id' del body (se envía en la URL) y devuelve la respuesta de la API.
 *
 * @param {Object} historial - El objeto con los datos actualizados.
 * @returns {Promise<any>} La respuesta de la API.
 */
export const updateHistorialMedico = async (historial) => {
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
    // Extraer el id y crear el payload sin el id.
    const { profileId, ...payload } = historial;
    const response = await axios.put(
      `${API.HISTORAL_CLINICO_PUT}`,
      payload,
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
