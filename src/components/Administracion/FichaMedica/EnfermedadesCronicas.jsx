import React, { useState } from "react";
import { useFichaMedicaStore } from "./useFichaMedicaStore";
import CustomInput from "./CustomInput";

const ChronicDiseaseSection = () => {
  // Obtenemos del store el arreglo de enfermedades y los métodos
  const { chronicDiseases, addChronicDisease, removeChronicDisease } =
    useFichaMedicaStore();

  // Estado local para una nueva enfermedad
  const [newDisease, setNewDisease] = useState({
    enfermedad: "",
    doctorEmail: "",
    centroMedico: "",
    medicamento: "",
    dosis: "",
  });

  // Actualiza los campos del formulario local
  const handleDiseaseChange = (field, value) => {
    setNewDisease((prev) => ({ ...prev, [field]: value }));
  };

  // Agrega la enfermedad al store y resetea el formulario
  const handleAddDisease = (e) => {
    e.preventDefault();
    if (newDisease.enfermedad.trim() !== "") {
      addChronicDisease(newDisease);
      setNewDisease({
        enfermedad: "",
        doctorEmail: "",
        centroMedico: "",
        medicamento: "",
        dosis: "",
      });
    }
  };

  return (
    <div>
      <details className="mb-4 bg-blue-600 text-white p-4 rounded">
        <summary className="cursor-pointer font-bold mb-2">
          Agregar Enfermedad Crónica
        </summary>
        <div className="mt-4 space-y-3">
          <CustomInput
            label="Enfermedad"
            placeholder="Ej: Diabetes"
            value={newDisease.enfermedad}
            onChange={(e) => handleDiseaseChange("enfermedad", e.target.value)}
          />
          <CustomInput
            label="Correo del Doctor"
            placeholder="Ej: doctor@email.com"
            value={newDisease.doctorEmail}
            onChange={(e) => handleDiseaseChange("doctorEmail", e.target.value)}
          />
          <CustomInput
            label="Centro Médico"
            placeholder="Ej: Hospital Central"
            value={newDisease.centroMedico}
            onChange={(e) =>
              handleDiseaseChange("centroMedico", e.target.value)
            }
          />
          <CustomInput
            label="Medicamento"
            placeholder="Ej: Insulina"
            value={newDisease.medicamento}
            onChange={(e) => handleDiseaseChange("medicamento", e.target.value)}
          />
          <CustomInput
            label="Dosis"
            placeholder="Ej: 10mg"
            value={newDisease.dosis}
            onChange={(e) => handleDiseaseChange("dosis", e.target.value)}
          />

          <button
            onClick={handleAddDisease}
            className="py-2 px-4 bg-green-500 text-white rounded cursor-pointer"
          >
            Agregar Enfermedad +
          </button>
        </div>
      </details>

      <details className="mb-4 bg-gray-50 p-4 rounded">
        <summary className="cursor-pointer font-bold text-lg mb-2">
          Enfermedades Crónicas Registradas
        </summary>
        {chronicDiseases.length > 0 ? (
          <div className="space-y-4">
            {chronicDiseases.map((disease, index) => (
              <div
                key={index}
                className="bg-white shadow-md border border-gray-200 rounded-lg p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h5 className="font-semibold text-gray-800">
                    {disease.enfermedad}
                  </h5>
                  <button
                    onClick={() => removeChronicDisease(index)}
                    className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Correo del Doctor:</strong> {disease.doctorEmail}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Centro Médico:</strong> {disease.centroMedico}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Medicamento:</strong> {disease.medicamento}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Dosis:</strong> {disease.dosis}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No hay enfermedades registradas.</p>
        )}
      </details>
    </div>
  );
};

export default ChronicDiseaseSection;
