// src/components/DetallesFicha.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ObtenerFichaGET } from "../Administracion/FichaMedica/ObtenerFichaGET";

const DetallesFicha = () => {
  const { state: profile } = useLocation();
  const [ficha, setFicha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Al montar, si tenemos profile.id, obtenemos los datos de la ficha
  useEffect(() => {
    if (profile && profile.id) {
      const fetchFicha = async () => {
        try {
          const data = await ObtenerFichaGET(profile.id);
          console.log("Respuesta completa:", data);
          if (data?.body) {
            setFicha(data.body); // AQUÍ se asigna data.body a ficha
          } else {
            setError("No se recibió la ficha en el campo 'body'.");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchFicha();
    } else {
      setError("No se encontró el perfil.");
      setLoading(false);
    }
  }, [profile]);

  if (loading) {
    return <p className="text-center mt-4">Cargando ficha...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500 mt-4">{error}</p>;
  }
  if (!ficha) {
    return <p className="text-center mt-4">No se encontró ficha.</p>;
  }

  // ---------------------
  // AHORA SÍ mostramos ficha.body de forma ordenada
  // Extraemos las propiedades principales:
  const {
    birthDate,
    weight,
    height,
    bloodType,
    medicationAllergyUsers,
    otherAllergiesUsers,
    chronicDiseasesUsers,
  } = ficha;

  // Formatear la fecha si viene como array [1969, 12, 5]
  let formattedDate = "";
  if (Array.isArray(birthDate) && birthDate.length === 3) {
    const [year, month, day] = birthDate;
    formattedDate = `${String(day).padStart(2, "0")}/${String(month).padStart(
      2,
      "0"
    )}/${year}`;
  } else if (typeof birthDate === "string") {
    formattedDate = birthDate;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded mt-4">
      <h1 className="text-2xl font-bold mb-4">Ficha de {profile.nombre}</h1>

      {/* Datos Generales */}
      <div className="mb-4 space-y-1">
        <p>
          <strong>Fecha de Nacimiento:</strong>{" "}
          {formattedDate || "No especificada"}
        </p>
        <p>
          <strong>Peso:</strong> {weight || "No especificado"}
        </p>
        <p>
          <strong>Altura:</strong> {height || "No especificada"}
        </p>
        <p>
          <strong>Tipo de Sangre:</strong> {bloodType || "No especificado"}
        </p>
      </div>

      {/* Alergias a Medicamentos */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Alergias a Medicamentos</h3>
        {medicationAllergyUsers && medicationAllergyUsers.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700">
            {medicationAllergyUsers.map((item) => (
              <li key={item.id}>{item.allergy}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            No hay alergias a medicamentos registradas.
          </p>
        )}
      </div>

      {/* Otras Alergias */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Otras Alergias</h3>
        {otherAllergiesUsers && otherAllergiesUsers.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700">
            {otherAllergiesUsers.map((item) => (
              <li key={item.id}>{item.allergy}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay otras alergias registradas.</p>
        )}
      </div>

      {/* Enfermedades Crónicas */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Enfermedades Crónicas</h3>
        {chronicDiseasesUsers && chronicDiseasesUsers.length > 0 ? (
          chronicDiseasesUsers.map((disease) => (
            <div
              key={disease.id}
              className="border border-gray-300 rounded p-4 mb-4 bg-gray-50"
            >
              <p>
                <strong>Enfermedad:</strong> {disease.disease}
              </p>
              <p>
                <strong>Correo del Doctor:</strong> {disease.doctorEmail}
              </p>
              <p>
                <strong>Centro Médico:</strong> {disease.medicalCenter}
              </p>
              {disease.medicalTreatmentUser &&
                disease.medicalTreatmentUser.length > 0 && (
                  <>
                    <p>
                      <strong>Medicamento:</strong>{" "}
                      {disease.medicalTreatmentUser[0]?.medication || "N/A"}
                    </p>
                    <p>
                      <strong>Dosis:</strong>{" "}
                      {disease.medicalTreatmentUser[0]?.dosage || "N/A"}
                    </p>
                  </>
                )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No hay enfermedades crónicas registradas.
          </p>
        )}
      </div>
    </div>
  );
};

export default DetallesFicha;
