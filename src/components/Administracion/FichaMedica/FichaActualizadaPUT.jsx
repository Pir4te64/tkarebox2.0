import axios from "axios";
import { API } from "../../../utils/Api";

export async function FichaActualizadaPUT(updatedData) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    // Si quieres asegurarte de enviar un string JSON, podrías forzarlo:
    const jsonBody = JSON.stringify(updatedData);

    const response = await axios.put(
      `${API.DATA_REGISTER_UPDATE}`,
      jsonBody, // También puedes enviar el objeto directamente si no es vacío
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("✅ Ficha actualizada correctamente.");
    return response.data;
  } catch (error) {
    if (error.response) {
      alert(
        `Error en la petición: ${error.response.status} - ${
          error.response.data.message || "Error desconocido"
        }`
      );
    } else {
      alert(
        `Error: ${error.message || "Ocurrió un error al actualizar la ficha."}`
      );
    }
  }
}
