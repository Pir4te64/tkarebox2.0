import React, { useState, useEffect } from "react";
import { useFichaMedicaStore } from "./useFichaMedicaStore";
import CustomInput from "./CustomInput";
import AllergyInputSection from "./AlergiasInput";
import ChronicDiseaseSection from "./EnfermedadesCronicas";
import { CrearFichaPOST } from "./CrearFichaPOST";
import { FichaActualizadaPUT } from "./FichaActualizadaPUT"; // Asegúrate de la ruta correcta
import { profileAdminGET } from "../PerfilAdminGET";
import { ObtenerFichaGET } from "./ObtenerFichaGET";

// Función para transformar los datos recibidos en el formato esperado por el store
const transformFichaData = (body) => {
  // Transformar la fecha
  let fechaNacTransformed = "";
  if (Array.isArray(body.birthDate) && body.birthDate.length >= 3) {
    const [year, month, day] = body.birthDate;
    fechaNacTransformed = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  } else if (typeof body.birthDate === "string") {
    fechaNacTransformed = body.birthDate;
  }

  // Transformar las alergias: extraer el campo "allergy"
  const medicationAllergiesTransformed = Array.isArray(
    body.medicationAllergyUsers
  )
    ? body.medicationAllergyUsers.map((item) => item.allergy)
    : [];
  const otherAllergiesTransformed = Array.isArray(body.otherAllergiesUsers)
    ? body.otherAllergiesUsers.map((item) => item.allergy)
    : [];

  // Transformar las enfermedades crónicas
  const chronicDiseasesTransformed = Array.isArray(body.chronicDiseasesUsers)
    ? body.chronicDiseasesUsers.map((item) => ({
        enfermedad: item.disease,
        doctorEmail: item.doctorEmail,
        centroMedico: item.medicalCenter,
        medicamento:
          item.medicalTreatmentUser && item.medicalTreatmentUser.length > 0
            ? item.medicalTreatmentUser[0].medication
            : "",
        dosis:
          item.medicalTreatmentUser && item.medicalTreatmentUser.length > 0
            ? item.medicalTreatmentUser[0].dosage
            : "",
      }))
    : [];

  return {
    fechaNac: fechaNacTransformed,
    peso: body.weight || "",
    altura: body.height || "",
    tipoSangre: body.bloodType || "",
    medicationAllergies: medicationAllergiesTransformed,
    otherAllergies: otherAllergiesTransformed,
    chronicDiseases: chronicDiseasesTransformed,
  };
};
function formatFecha(yyyy_mm_dd) {
  if (!yyyy_mm_dd) return "";
  const [year, month, day] = yyyy_mm_dd.split("-");
  return `${day}/${month}/${year}`;
}
const FichaMedica = () => {
  // Extraemos estados y setters del store
  const {
    fechaNac,
    setFechaNac,
    peso,
    setPeso,
    altura,
    setAltura,
    tipoSangre,
    setTipoSangre,
    medicationAllergies,
    addMedicationAllergy,
    removeMedicationAllergy,
    otherAllergies,
    addOtherAllergy,
    removeOtherAllergy,
    setFichaMedicaData,
  } = useFichaMedicaStore();

  // Estados locales para inputs de alergias
  const [newMedicationAllergy, setNewMedicationAllergy] = useState("");
  const [newOtherAllergy, setNewOtherAllergy] = useState("");

  // Estado local para almacenar los datos del afiliado
  const [afiliado, setAfiliado] = useState(null);
  // Estado para determinar si ya existe una ficha
  const [isFichaExist, setIsFichaExist] = useState(false);

  // Obtener datos del afiliado al montar el componente
  useEffect(() => {
    const fetchAffiliate = async () => {
      try {
        const data = await profileAdminGET();
        setAfiliado(data);
      } catch (error) {
        alert("Error al obtener datos del afiliado: " + error.message);
      }
    };
    fetchAffiliate();
  }, []);

  // Una vez que se obtiene el afiliado, obtener la ficha, actualizar el store y marcar que existe
  useEffect(() => {
    if (afiliado && afiliado.id) {
      const fetchFicha = async () => {
        try {
          const fichaData = await ObtenerFichaGET(afiliado.id);
          console.log("Ficha GET:", fichaData);
          if (fichaData?.body) {
            const transformedData = transformFichaData(fichaData.body);
            setFichaMedicaData(transformedData);
            setIsFichaExist(true);
          } else {
            setIsFichaExist(false);
          }
        } catch (error) {
          console.error("Error al obtener ficha:", error.message);
        }
      };
      fetchFicha();
    }
  }, [afiliado, setFichaMedicaData]);

  // Función para preparar la data actualizada desde el store para PUT/POST
  const prepareFichaData = () => {
    const {
      fechaNac,
      peso,
      altura,
      tipoSangre,
      medicationAllergies,
      otherAllergies,
      chronicDiseases,
    } = useFichaMedicaStore.getState();

    // Asegúrate de que afiliado esté definido
    if (!afiliado || !afiliado.id) {
      return undefined;
    }

    const dateObj = new Date(fechaNac);
    dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());
    const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;

    const medicationAllergyUsers = Array.isArray(medicationAllergies)
      ? medicationAllergies.map((allergy, index) => ({
          id: index.toString(),
          allergy,
        }))
      : [];
    const otherAllergiesUsers = Array.isArray(otherAllergies)
      ? otherAllergies.map((allergy, index) => ({
          id: index.toString(),
          allergy,
        }))
      : [];
    const chronicDiseasesUsers = Array.isArray(chronicDiseases)
      ? chronicDiseases.map((disease, index) => ({
          id: index.toString(),
          disease: disease.enfermedad,
          doctorEmail: disease.doctorEmail,
          medicalCenter: disease.centroMedico,
          medicalTreatmentUser: [
            {
              medication: disease.medicamento,
              dosage: disease.dosis,
            },
          ],
        }))
      : [];

    return {
      userId: afiliado.id,
      userDataId: "",
      birthDate: formattedDate,
      weight: String(peso),
      height: String(altura),
      bloodType: tipoSangre,
      medicationAllergyUsers,
      otherAllergiesUsers,
      chronicDiseasesUsers,
    };
  };

  // Función para manejar el submit del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!afiliado || !afiliado.id) {
      alert("No se pudo obtener el ID del afiliado.");
      return;
    }
    const updatedData = prepareFichaData();
    let response;
    if (isFichaExist) {
      response = await FichaActualizadaPUT(updatedData);
    } else {
      response = await CrearFichaPOST(afiliado.id);
    }
    if (response) {
      try {
        const fichaData = await ObtenerFichaGET(afiliado.id);
        console.log("Ficha actualizada GET:", fichaData);
        if (fichaData?.body) {
          const transformedData = transformFichaData(fichaData.body);
          setFichaMedicaData(transformedData);
        }
      } catch (error) {
        console.error("Error al obtener la ficha actualizada:", error.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "1rem",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      {/* Fecha de Nacimiento */}
      <CustomInput
        label="Fecha de Nacimiento"
        type="date"
        placeholder="Selecciona tu fecha de nacimiento"
        value={fechaNac}
        onChange={(e) => setFechaNac(e.target.value)}
      />
      <p style={{ marginTop: "0.5rem" }}>
        {fechaNac
          ? `Fecha seleccionada: ${formatFecha(fechaNac)}`
          : "No se ha seleccionado fecha"}
      </p>

      {/* Datos generales */}
      <div
        style={{
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginBottom: "1rem",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Datos</h3>

        {/* Peso */}
        <CustomInput
          label="Peso"
          type="number"
          placeholder="Ingrese su peso en kg"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />

        {/* Altura */}
        <CustomInput
          label="Altura"
          type="number"
          placeholder="Ingrese su altura en cm"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
        />

        {/* Tipo de Sangre */}
        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Tipo de Sangre
          </label>
          <select
            value={tipoSangre}
            onChange={(e) => setTipoSangre(e.target.value)}
            style={{ padding: "0.5rem", width: "100%" }}
          >
            <option value="">Selecciona tu tipo de sangre</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>

      {/* Sección: Alergias a Medicamentos */}
      <AllergyInputSection
        title="Agregar Alergia a Medicamentos"
        inputPlaceholder="Ej 'Penicilina'"
        newAllergyValue={newMedicationAllergy}
        onNewAllergyChange={(e) => setNewMedicationAllergy(e.target.value)}
        onAddAllergy={(e) => {
          e.preventDefault();
          if (newMedicationAllergy.trim() !== "") {
            addMedicationAllergy(newMedicationAllergy.trim());
            setNewMedicationAllergy("");
          }
        }}
        allergies={medicationAllergies}
        onRemoveAllergy={removeMedicationAllergy}
      />

      {/* Sección: Otras Alergias */}
      <AllergyInputSection
        title="Agregar Otras Alergias"
        inputPlaceholder="Otras alergias"
        newAllergyValue={newOtherAllergy}
        onNewAllergyChange={(e) => setNewOtherAllergy(e.target.value)}
        onAddAllergy={(e) => {
          e.preventDefault();
          if (newOtherAllergy.trim() !== "") {
            addOtherAllergy(newOtherAllergy.trim());
            setNewOtherAllergy("");
          }
        }}
        allergies={otherAllergies}
        onRemoveAllergy={removeOtherAllergy}
      />

      {/* Sección: Enfermedad Crónica */}
      <ChronicDiseaseSection />

      {/* Botón para enviar el formulario */}
      <button
        type="submit"
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#2563EB",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        {isFichaExist ? "Actualizar Información" : "Guardar Información"}
      </button>
    </form>
  );
};

export default FichaMedica;
