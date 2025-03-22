import React, { useState, useEffect } from "react";
import { ObtenerFichaGET } from "../FichaMedica/ObtenerFichaGET";

const ModalDetallesAfiliado = ({ isOpen, onClose, user }) => {
  const [ficha, setFicha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && user && user.id) {
      setLoading(true);
      setError("");
      const fetchFicha = async () => {
        try {
          const data = await ObtenerFichaGET(user.id);

          if (data?.body) {
            setFicha(data.body);
          } else {
            setError("El usuario no tiene ficha medica.");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchFicha();
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Detalles del Afiliado</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        {loading ? (
          <p className="text-center mt-4">Cargando ficha...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-4">{error}</p>
        ) : !ficha ? (
          <p className="text-center mt-4">No se encontró ficha.</p>
        ) : (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-4">Ficha de {user.nombre}</h3>

            {/* Datos Generales */}
            <div className="mb-4 space-y-1">
              {(() => {
                let formattedDate = "";
                const { birthDate } = ficha;
                if (Array.isArray(birthDate) && birthDate.length === 3) {
                  const [year, month, day] = birthDate;
                  formattedDate = `${String(day).padStart(2, "0")}/${String(
                    month
                  ).padStart(2, "0")}/${year}`;
                } else if (typeof birthDate === "string") {
                  formattedDate = birthDate;
                }
                return (
                  <p>
                    <strong>Fecha de Nacimiento:</strong>{" "}
                    {formattedDate || "No especificada"}
                  </p>
                );
              })()}
              <p>
                <strong>Peso:</strong> {ficha.weight || "No especificado"}
              </p>
              <p>
                <strong>Altura:</strong> {ficha.height || "No especificada"}
              </p>
              <p>
                <strong>Tipo de Sangre:</strong>{" "}
                {ficha.bloodType || "No especificado"}
              </p>
            </div>

            {/* Alergias a Medicamentos */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">
                Alergias a Medicamentos
              </h4>
              {ficha.medicationAllergyUsers &&
              ficha.medicationAllergyUsers.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {ficha.medicationAllergyUsers.map((item) => (
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
              <h4 className="text-lg font-semibold mb-2">Otras Alergias</h4>
              {ficha.otherAllergiesUsers &&
              ficha.otherAllergiesUsers.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {ficha.otherAllergiesUsers.map((item) => (
                    <li key={item.id}>{item.allergy}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  No hay otras alergias registradas.
                </p>
              )}
            </div>

            {/* Enfermedades Crónicas */}
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Enfermedades Crónicas
              </h4>
              {ficha.chronicDiseasesUsers &&
              ficha.chronicDiseasesUsers.length > 0 ? (
                ficha.chronicDiseasesUsers.map((disease) => (
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
                            {disease.medicalTreatmentUser[0]?.medication ||
                              "N/A"}
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
        )}
      </div>
    </div>
  );
};

export default ModalDetallesAfiliado;
