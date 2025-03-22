// src/HistoricalMedicoDELETE.js
import axios from "axios";
import { API } from "../../utils/Api";

/**
 * Función para eliminar un historial médico.
 * @param {string} historialId - El ID del historial médico a eliminar.
 * @param {string} apiUrl - La URL base de la API.
 * @param {function} setLoading - Función para controlar el estado de carga.
 * @returns {boolean} - Retorna `true` si la eliminación fue exitosa, `false` en caso de error.
 */
export const deleteHistorialMedico = async (historialId, setLoading) => {
  const token = localStorage.getItem("token"); // Obtener el token desde localStorage

  if (!token) {
    console.error("No se encontró el token en localStorage");
    return false;
  }

  setLoading(true); // Establecer el estado de carga en `true`

  try {
    const response = await axios.delete(
      `${API.HISTORAL_CLINICO_DELETE}/${historialId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Verificar si la respuesta es exitosa
    if (response.status === 200) {
      console.log(
        `Historial médico con ID ${historialId} eliminado correctamente.`
      );
      return true;
    } else {
      console.error("Error al eliminar el historial médico.");
      return false;
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    return false;
  } finally {
    setLoading(false); // Establecer el estado de carga en `false` después de la operación
  }
};
