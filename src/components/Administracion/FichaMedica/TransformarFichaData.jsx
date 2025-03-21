export const transformFichaData = (body) => {
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

export function formatFecha(yyyy_mm_dd) {
  if (!yyyy_mm_dd) return "";
  const [year, month, day] = yyyy_mm_dd.split("-");
  return `${day}/${month}/${year}`;
}
