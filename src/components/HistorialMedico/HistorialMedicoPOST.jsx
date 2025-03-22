// Importamos Axios (asegúrate de tenerlo instalado con npm install axios)
import axios from "axios";
import { API } from "../../utils/Api";
export const HistorialMedicoPOST = async (newHistorial, setLoading) => {
  setLoading(true); // Mostrar el loader mientras guardamos
  try {
    // Obtener el token del localStorage
    const token = localStorage.getItem("token"); // Asumimos que el token está guardado con la clave 'token'

    // Comprobamos si el token existe
    if (!token) {
      alert("No se encontró un token válido. Inicia sesión nuevamente.");
      setLoading(false);
      return;
    }

    // Aquí usaremos Axios para enviar la solicitud
    const response = await axios.post(
      `${API.HISTORAL_CLINICO_POST}`, // Aquí deberías colocar la URL correcta de tu API
      newHistorial, // El objeto nuevo historial que se enviará
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pasamos el token en la cabecera como Bearer
        },
      }
    );

    // Simulamos la respuesta exitosa
    console.log("Nuevo historial médico creado:", response.data);

    // Retorna true si la creación es exitosa
    alert("Nuevo historial médico creado");
    return true;
  } catch (error) {
    // Manejo de errores
    console.error("Error al crear el historial:", error);
    alert("Error al crear el historial");
    return false;
  } finally {
    setLoading(false); // Ocultar el loader después de guardar
  }
};
