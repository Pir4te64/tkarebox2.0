import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes que se van a utilizar en Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartForTest = ({ data, examName }) => {
  // Filtrar los datos según el examen deseado
  const filteredData = data.filter((item) => item.test === examName);

  // Extraer las etiquetas (fechas) y convertirlas a un string (por ejemplo, "2024-11-20")
  const labels = filteredData.map((item) => item.date.join("-"));

  // Extraer los valores numéricos de "result"
  // Asumimos que result es un string que comienza con el valor numérico
  const values = filteredData.map((item) => {
    const number = parseFloat(item.result);
    return isNaN(number) ? 0 : number;
  });

  // Tomamos referenceMin y referenceMax del primer item (si existe)
  let referenceMin = "";
  let referenceMax = "";
  if (filteredData.length > 0) {
    referenceMin = filteredData[0].referenceMin || "";
    referenceMax = filteredData[0].referenceMax || "";
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: examName,
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: examName },
    },
  };

  return (
    <div className="w-full">
      {/* Mostrar rangos si existen */}
      {filteredData.length > 0 && (
        <p className="text-sm text-gray-500 mb-2">
          Rango mínimo: {referenceMin} | Rango máximo: {referenceMax}
        </p>
      )}

      {/* El gráfico de barras */}
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartForTest;
