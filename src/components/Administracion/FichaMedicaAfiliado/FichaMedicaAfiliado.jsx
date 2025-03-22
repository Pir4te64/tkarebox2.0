import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFichaMedicaStore } from "../../Administracion/FichaMedica/useFichaMedicaStore";
import CustomInput from "../../Administracion/FichaMedica/CustomInput";
import AllergyInputSection from "../../Administracion/FichaMedica/AlergiasInput";
import ChronicDiseaseSection from "../../Administracion/FichaMedica/EnfermedadesCronicas";
import { CrearFichaPOST } from "../../Administracion/FichaMedica/CrearFichaPOST";
import { FichaActualizadaPUT } from "../../Administracion/FichaMedica/FichaActualizadaPUT"; // Asegúrate de la ruta correcta
import { ObtenerFichaGET } from "../../Administracion/FichaMedica/ObtenerFichaGET";
import {
  formatFecha,
  transformFichaData,
} from "../../Administracion/FichaMedica/TransformarFichaData";
import Header from "../../../components/Header";

const FichaMedicaAfiliado = () => {
  // Obtenemos el ID del afiliado desde el state de navegación
  const location = useLocation();
  const affiliateFromState = location.state?.id; // Ahora solo usamos este ID

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

  // Estado para determinar si ya existe una ficha
  const [isFichaExist, setIsFichaExist] = useState(false);

  // Una vez que se tiene el ID del afiliado, obtener la ficha, actualizar el store y marcar que existe
  useEffect(() => {
    if (affiliateFromState) {
      const fetchFicha = async () => {
        try {
          const fichaData = await ObtenerFichaGET(affiliateFromState);
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
  }, [affiliateFromState, setFichaMedicaData]);

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

    // Verificamos que tengamos un ID
    if (!affiliateFromState) {
      return undefined;
    }

    // Ajustamos la fecha compensando el timezone offset para evitar restar un día
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
      userId: affiliateFromState,
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
    if (!affiliateFromState) {
      alert("No se pudo obtener el ID del afiliado.");
      return;
    }
    const updatedData = prepareFichaData();
    let response;
    if (isFichaExist) {
      response = await FichaActualizadaPUT(updatedData);
    } else {
      response = await CrearFichaPOST(affiliateFromState);
    }
    if (response) {
      try {
        const fichaData = await ObtenerFichaGET(affiliateFromState);
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
    <div>
      <Header title={"Ficha Medica Afiliado"} />
      {/* Puedes mostrar información adicional si se requiere */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-3 mt-20 font-sans border border-gray-300 rounded-lg overflow-y-auto"
      >
        <details className="mb-4 bg-azul p-2 rounded">
          <summary className="cursor-pointer font-bold text-lg bg-azul text-white p-2 rounded">
            Información Personal
          </summary>

          {/* Fecha de Nacimiento */}
          <div className="mb-4">
            <CustomInput
              label="Fecha de Nacimiento"
              type="date"
              placeholder="Selecciona tu fecha de nacimiento"
              value={fechaNac}
              onChange={(e) => setFechaNac(e.target.value)}
            />
            <p className="mt-2 text-white flex justify-center">
              {fechaNac
                ? `Fecha seleccionada: ${formatFecha(fechaNac)}`
                : "No se ha seleccionado fecha"}
            </p>
          </div>

          {/* Datos generales */}
          <div className="p-4 border border-gray-300 rounded">
            <h3 className="mt-0 font-bold text-lg mb-2 text-white">Datos</h3>

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
            <div className="mb-4">
              <label className="block mb-2 font-bold text-white">
                Tipo de Sangre
              </label>
              <select
                value={tipoSangre}
                onChange={(e) => setTipoSangre(e.target.value)}
                className="p-2 w-full border border-gray-300 rounded"
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
        </details>

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
          className="py-3 px-6 bg-azul text-white rounded cursor-pointer mt-4 w-full"
        >
          {isFichaExist ? "Actualizar Información" : "Guardar Información"}
        </button>
      </form>
    </div>
  );
};

export default FichaMedicaAfiliado;
