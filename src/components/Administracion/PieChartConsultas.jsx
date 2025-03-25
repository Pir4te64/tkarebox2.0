// src/components/PieChartWithLegend.jsx
import React, { useEffect, useRef, useMemo } from "react";
import Chart from "chart.js/auto";

const PieChartWithLegend = ({ data }) => {
  const chartRef = useRef(null);
  // Definimos un arreglo de colores para asignarlos a las especialidades
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  // Agrupar las consultas por especialidad
  const aggregated = useMemo(() => {
    return data.reduce((acc, consulta) => {
      const { specialty } = consulta;
      if (!acc[specialty]) {
        acc[specialty] = [];
      }
      acc[specialty].push(consulta);
      return acc;
    }, {});
  }, [data]);

  const specialties = Object.keys(aggregated);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");

    // Contar cuántas consultas hay por especialidad
    const specialtiesCount = specialties.map((spec) => aggregated[spec].length);

    const chartData = {
      labels: specialties,
      datasets: [
        {
          data: specialtiesCount,
          backgroundColor: specialties.map(
            (_, index) => colors[index % colors.length]
          ),
        },
      ],
    };

    // Crear el gráfico de torta
    const pieChart = new Chart(ctx, {
      type: "pie",
      data: chartData,
      options: {
        responsive: true,
      },
    });

    // Limpiar el gráfico al desmontar o actualizar
    return () => {
      pieChart.destroy();
    };
  }, [aggregated, specialties, colors]);

  return (
    <div>
      <canvas ref={chartRef} />
      <div className="mt-4">
        {specialties.map((specialty, idx) => (
          <div key={specialty} className="mb-2">
            <div className="flex items-center">
              {/* Cuadradito de color */}
              <div
                style={{
                  backgroundColor: colors[idx % colors.length],
                  width: "20px",
                  height: "20px",
                  marginRight: "8px",
                }}
              ></div>
              <span className="font-bold text-gray-500">{specialty}</span>
            </div>
            {/* Lista de consultas para la especialidad */}
            <ul className="ml-8 overflow-y-auto max-h-40">
              {aggregated[specialty].map((consulta) => (
                <li key={consulta.id} className="text-sm text-azul">
                  <span>{consulta.date}</span> -{" "}
                  <span>{consulta.diagnoses.join(", ")}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartWithLegend;
