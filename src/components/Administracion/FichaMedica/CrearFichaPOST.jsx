import { API } from "../../../utils/Api";
import axios from "axios";
import { useFichaMedicaStore } from "./useFichaMedicaStore";

export const CrearFichaPOST = async (afiliado) => {
  try {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      throw new Error("No se encontró el token de autenticación");
    }
    // Obtenemos los estados actuales del store
    const {
      fechaNac,
      peso,
      altura,
      tipoSangre,
      medicationAllergies,
      otherAllergies,
      chronicDiseases,
    } = useFichaMedicaStore.getState();

    // Formateamos la fecha de nacimiento al formato YYYY-MM-DD
    const dateObj = fechaNac instanceof Date ? fechaNac : new Date(fechaNac);
    const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;

    // Convertir los arrays de alergias a objetos con id y allergy
    const medicationAllergyUsers = Array.isArray(medicationAllergies)
      ? medicationAllergies.map((allergy, index) => ({
          id: index.toString(), // Aquí puedes generar un ID único si lo prefieres
          allergy: allergy,
        }))
      : [];

    const otherAllergiesUsers = Array.isArray(otherAllergies)
      ? otherAllergies.map((allergy, index) => ({
          id: index.toString(),
          allergy: allergy,
        }))
      : [];

    // Convertir el array de enfermedades crónicas
    const chronicDiseasesUsers = Array.isArray(chronicDiseases)
      ? chronicDiseases.map((disease, index) => ({
          id: index.toString(), // Puedes generar un ID único si es necesario
          disease: disease.enfermedad,
          doctorEmail: disease.doctorEmail,
          medicalCenter: disease.centroMedico, // Traducido a la clave esperada
          medicalTreatmentUser: [
            {
              medication: disease.medicamento,
              dosage: disease.dosis,
            },
          ],
        }))
      : [];

    // Armamos el objeto con la información a enviar
    const formData = {
      userId: afiliado,
      userDataId: "", // Puedes asignar un valor si lo requieres
      birthDate: formattedDate,
      weight: String(peso), // Convertido a string si es necesario
      height: String(altura),
      bloodType: tipoSangre,
      medicationAllergyUsers,
      otherAllergiesUsers,
      chronicDiseasesUsers,
    };

    console.log("📡 Enviando datos:", JSON.stringify(formData, null, 2));

    // Realizamos la petición POST con axios
    const response = await axios.post(API.DATA_REGISTER, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("✅ Respuesta exitosa:", response.data);
    alert("✅ Éxito: Los datos se enviaron correctamente.");
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
        `Error: ${error.message || "Ocurrió un error al enviar los datos."}`
      );
    }
  }
};
