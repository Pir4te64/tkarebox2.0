// Archivo: ChronicDiseaseSection.jsx
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
      <details style={{ marginBottom: "1rem" }}>
        <summary
          style={{
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            backgroundColor: "#4F46E5",
            color: "#fff",
            padding: "0.5rem",
            borderRadius: "4px",
          }}
        >
          Agregar Enfermedad Crónica
        </summary>
        <div style={{ marginTop: "1rem" }}>
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
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#10B981",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Agregar Enfermedad +
          </button>
        </div>
      </details>

      {/* Lista de enfermedades crónicas agregadas */}
      {chronicDiseases.length > 0 && (
        <div>
          <h4>Enfermedades Crónicas Registradas</h4>
          {chronicDiseases.map((disease, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <p>
                <strong>Enfermedad:</strong> {disease.enfermedad}
              </p>
              <p>
                <strong>Correo del Doctor:</strong> {disease.doctorEmail}
              </p>
              <p>
                <strong>Centro Médico:</strong> {disease.centroMedico}
              </p>
              <p>
                <strong>Medicamento:</strong> {disease.medicamento}
              </p>
              <p>
                <strong>Dosis:</strong> {disease.dosis}
              </p>
              <button
                onClick={() => removeChronicDisease(index)}
                style={{
                  padding: "0.3rem 0.6rem",
                  backgroundColor: "red",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChronicDiseaseSection;
