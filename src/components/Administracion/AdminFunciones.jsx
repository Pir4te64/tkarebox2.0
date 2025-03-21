// src/components/TarjetaAdmin.jsx
import React, { useState } from "react";
import { FaUser, FaIdCard } from "react-icons/fa";
import ModalActualizarNombre from "./Modales/ModalActualizarNombre";
import ModalActualizarPassword from "./Modales/ModalActualizarPassword";

/**
 * Muestra la tarjeta con el nombre y documento de un perfil.
 * @param {{ nombre: string; documento: string }} profile - Datos del perfil
 * @param {function} reloadProfile - Función para recargar el perfil tras actualizar
 */
const TarjetaAdmin = ({ profile, reloadProfile }) => {
  // Controla la apertura/cierre del modal para actualizar nombre
  const [showModalName, setShowModalName] = useState(false);

  // Controla la apertura/cierre del modal para actualizar password
  const [showModalPass, setShowModalPass] = useState(false);

  return (
    <div className="bg-azul text-white rounded-2xl shadow-xl w-full max-w-sm p-6 mb-4">
      {/* Fila para nombre */}
      <div className="flex items-center gap-2 mb-2">
        <FaUser size={20} />
        <span className="font-semibold text-lg">{profile.nombre}</span>
      </div>

      {/* Documento */}
      <div className="flex items-center gap-2 mb-4">
        <FaIdCard size={20} />
        <span className="font-semibold text-lg">{profile.documento}</span>
      </div>

      {/* Botón para actualizar nombre */}
      <button
        onClick={() => setShowModalName(true)}
        className="bg-white text-azul w-full py-2 px-3 rounded-lg font-semibold transition hover:bg-gray-200 mb-2"
      >
        Actualizar Nombre
      </button>

      {/* Botón para actualizar password */}
      <button
        onClick={() => setShowModalPass(true)}
        className="bg-white text-azul w-full py-2 px-3 rounded-lg font-semibold transition hover:bg-gray-200"
      >
        Actualizar Password
      </button>

      {/* Modal para actualizar nombre */}
      <ModalActualizarNombre
        isOpen={showModalName}
        onClose={() => setShowModalName(false)}
        user={{ name: profile.nombre, document: profile.documento }}
        reloadProfile={reloadProfile}
      />

      {/* Modal para actualizar password */}
      <ModalActualizarPassword
        isOpen={showModalPass}
        onClose={() => setShowModalPass(false)}
        userDocument={profile.documento}
        reloadProfile={reloadProfile}
      />
    </div>
  );
};

export default TarjetaAdmin;
