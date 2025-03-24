// src/api/HistorialMedicoGET.js
import axios from "axios";
import { API } from "../../utils/Api";
import { ObtenerFichaGET } from "../Administracion/FichaMedica/ObtenerFichaGET";

export const HistorialMedicoGET = async (profileId) => {
  // Obtener el token de localStorage
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No se encontró el token de autenticación");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fichaResponse = await ObtenerFichaGET(profileId);

  const historialResponse = await axios.get(
    `${API.HISTORAL_CLINICO_GET_BY_USER}/${fichaResponse.body.userDataId}`,
    config
  );
  // Combinar la información (ajusta según tus necesidades)
  return {
    historial: historialResponse.data, // Datos del historial
    userDataId: fichaResponse.body.userDataId,
  };
};
