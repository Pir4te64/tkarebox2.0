// src/services/postRequest.js
import axios from "axios";
import { API } from "../../utils/Api";

/**
 * Envía un formulario con archivo PDF y el tipo de análisis usando Axios.
 * @param {FormData} formData - Contiene el archivo PDF y el campo tipoAnalisis.
 * @returns {Promise<any>} - Respuesta JSON de la API si la petición es exitosa.
 * @throws {Error} - Lanza un error si no se encuentra token o la respuesta falla.
 */
const postRequest = async (formData) => {
  // Tomamos el token desde localStorage
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error(
      "No se encontró el token de autenticación en localStorage."
    );
  }

  // Nuestra URL, sin query params
  const url = API.CHATGPT; // Ejemplo: "https://tkarebox.com/recetary/api/openai/analyze"

  console.log("Enviando a URL:", url);

  try {
    // Configuración para Axios
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        // axios se encarga de multipart/form-data boundary
      },
    };

    // Realiza la solicitud POST con Axios
    const response = await axios.post(url, formData, config);

    // Retornamos la respuesta; si status no es 2xx, Axios lanza excepción
    return response.data;
  } catch (error) {
    console.error("Error en postRequest:", error);
    throw new Error(error?.response?.data?.message || error.message);
  }
};

export default postRequest;
