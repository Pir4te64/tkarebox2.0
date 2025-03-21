// src/services/creacionDependientePOST.js
import axios from "axios";
import { API } from "../../utils/Api";

/**
 * Realiza una petición POST para crear un dependiente.
 * @param {{document: string; name: string; password: string;}} values - Campos necesarios para crear el dependiente.
 * @returns {Promise<any>} Respuesta de la API o Error si falla.
 */
export async function creacionDependientePOST(values) {
  // Extrae los campos de `values` según necesites
  const { document, name, password } = values;

  // Obtén el token del localStorage
  const token = localStorage.getItem("token");

  // Prepara configuración para axios
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Si tienes token, añade la cabecera de autorización
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  // Realiza la petición POST
  const response = await axios.post(
    API.DEPENDIENTE,
    {
      document,
      pseudonym: document, // asumiendo que pseudonym es igual a document
      name,
      password,
    },
    config
  );

  // axios lanza un error si el status no está en el rango 200-299
  // por lo que no necesitarías hacer manualmente throw error
  // pero si deseas un mensaje:

  return response.data; // Retornamos los datos de la respuesta
}
