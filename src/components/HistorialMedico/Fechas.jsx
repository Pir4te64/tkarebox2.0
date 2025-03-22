export const formatDatePrincipal = (date) => {
  if (Array.isArray(date)) {
    const year = date[0];
    const month = date[1] < 10 ? `0${date[1]}` : date[1];
    const day = date[2] < 10 ? `0${date[2]}` : date[2];
    return `${year}-${month}-${day}`;
  }

  if (typeof date === "string") {
    return date; // Si ya es una cadena, solo devuélvela
  }

  return ""; // Valor por defecto
};
// utils/fechas.js

/**
 * Convierte una fecha en formato YYYY-MM-DD
 * @param {Date | string | Array} date La fecha a convertir. Puede ser un objeto Date, una cadena o un array con formato [yyyy, mm, dd].
 * @returns {string} La fecha en formato YYYY-MM-DD.
 */
export const formatDateYYYYMMDD = (date) => {
  let formattedDate;

  // Si la fecha es un array en formato [yyyy, mm, dd]
  if (Array.isArray(date)) {
    const [year, month, day] = date;
    // Asegurarnos de que el mes y el día siempre tengan 2 dígitos
    formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  } else if (typeof date === "string" || date instanceof Date) {
    // Si la fecha es una cadena o un objeto Date, la convertimos a un formato YYYY-MM-DD
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // Mes en JavaScript es 0-indexado
    const day = dateObj.getDate();

    formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  } else {
    throw new Error("El formato de la fecha no es válido.");
  }

  return formattedDate;
};
