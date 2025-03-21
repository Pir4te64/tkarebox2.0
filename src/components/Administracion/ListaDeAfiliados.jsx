// src/components/ListaAfiliados.jsx
import React from "react";

/**
 * Componente que muestra la lista de afiliados, recibe un array de afiliados por props.
 */
const ListaAfiliados = ({ afiliados }) => {
  if (!afiliados || afiliados.length === 0) {
    return <p className="text-gray-700">No hay afiliados registrados.</p>;
  }

  return (
    <ul className="space-y-2">
      {afiliados.map((afil) => (
        <li
          key={afil.id}
          className="flex items-center justify-between bg-gray-50 p-3 rounded shadow-sm"
        >
          <span className="font-medium">{afil.nombre}</span>
          <span className="text-sm text-gray-600">DOC: {afil.documento}</span>
        </li>
      ))}
    </ul>
  );
};

export default ListaAfiliados;
