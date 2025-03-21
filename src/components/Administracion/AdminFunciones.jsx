import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaIdCard } from "react-icons/fa";
import ModalActualizarNombre from "./Modales/ModalActualizarNombre";
import ModalActualizarPassword from "./Modales/ModalActualizarPassword";

const TarjetaAdmin = ({ profile, reloadProfile }) => {
  const [showModalName, setShowModalName] = useState(false);
  const [showModalPass, setShowModalPass] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white rounded-b-lg shadow-xl w-full p-6 mb-4">
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

      {/* Agrupar botones en un details */}
      <details className="bg-white text-azul rounded-lg p-3 mb-2">
        <summary className="cursor-pointer font-bold text-center mb-2">
          Funciones
        </summary>

        <button
          onClick={() => setShowModalName(true)}
          className="bg-white text-azul w-full py-2 px-3 rounded-lg font-semibold transition hover:bg-gray-200 mb-2"
        >
          Actualizar Nombre
        </button>

        <button
          onClick={() => setShowModalPass(true)}
          className="bg-white text-azul w-full py-2 px-3 rounded-lg font-semibold transition hover:bg-gray-200 mb-2"
        >
          Actualizar Password
        </button>

        <button
          onClick={() => navigate("/fichaMedica")}
          className="bg-white text-azul w-full py-2 px-3 rounded-lg font-semibold transition hover:bg-gray-200 mb-2"
        >
          Ficha Medica
        </button>

        <button
          onClick={() => navigate("/detalles", { state: profile })}
          className="bg-white text-azul w-full py-2 px-3 rounded-lg font-semibold transition hover:bg-gray-200 mb-2"
        >
          Detalles
        </button>

        {/* Nuevo botón para ir a Contactos */}
        <button
          onClick={() => navigate("/contactos", { state: profile })}
          className="bg-white text-azul w-full py-2 px-3 rounded-lg font-semibold transition hover:bg-gray-200"
        >
          Contactos
        </button>
      </details>

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
