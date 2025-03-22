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
