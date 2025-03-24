import React, { useState } from "react";
import { FaIdCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ModalActualizarRol from "./Modales/ModalActualizarRol";
import ModalActualizarNombreAfiliado from "./Modales/ModalActualizarNombreAfiliado";
import ModalActualizarPassword from "./Modales/ModalActualizarPassword";
import ModalDetallesAfiliado from "./Modales/ModalDetallesAfiliado";
import ModalHistorialConsultas from "./Modales/ModalHistorialClinico";

const Afiliados = ({ afiliados, reloadProfile }) => {
  const [activeModal, setActiveModal] = useState(null); // "rol", "name", "pass", "detail", "consultas" o null
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  // Función genérica para abrir un modal
  const openModal = (type, afil) => {
    setSelectedUser(afil);
    setActiveModal(type);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setActiveModal(null);
    setSelectedUser(null);
  };

  if (!afiliados || afiliados.length === 0) {
    return <p className="text-gray-700">No hay afiliados registrados.</p>;
  }

  return (
    <>
      <ul className="space-y-4">
        {afiliados.map((afil) => (
          <li key={afil.id} className="bg-white p-3 rounded shadow-sm">
            <div className="flex items-center mb-2 justify-between">
              <span className="font-semibold text-gray-800">{afil.nombre}</span>
              <div className="flex items-center justify-end">
                <FaIdCard className="text-azul mr-2" />
                <div className="text-sm text-gray-600">{afil.documento}</div>
              </div>
            </div>

            <hr className="mb-3" />

            <details className="bg-white text-azul rounded-lg p-3 overflow-y-auto max-h-60">
              <summary className="cursor-pointer font-bold text-center">
                Funciones
              </summary>
              <div className="mt-2 flex flex-col gap-2">
                <button
                  type="button"
                  className="w-full py-2 text-sm text-white bg-azul rounded-md hover:bg-blue-100 hover:text-blue-700"
                  onClick={() => openModal("rol", afil)}
                >
                  Cambiar Rol
                </button>

                <button
                  type="button"
                  className="w-full py-2 text-sm text-white bg-azul rounded-md hover:bg-blue-100 hover:text-blue-700"
                  onClick={() => openModal("name", afil)}
                >
                  Actualizar Nombre
                </button>

                <button
                  type="button"
                  className="w-full py-2 text-sm text-white bg-azul rounded-md hover:bg-blue-100 hover:text-blue-700"
                  onClick={() => openModal("pass", afil)}
                >
                  Actualizar Contraseña
                </button>

                <button
                  type="button"
                  className="w-full py-2 text-sm text-white bg-azul rounded-md hover:bg-blue-100 hover:text-blue-700"
                  onClick={() => openModal("detail", afil)}
                >
                  Detalles
                </button>

                <button
                  type="button"
                  className="w-full py-2 text-sm text-white bg-azul rounded-md hover:bg-blue-100 hover:text-blue-700"
                  onClick={() => openModal("consultas", afil)}
                >
                  Historial de consultas medicas
                </button>

                <button
                  type="button"
                  className="w-full py-2 text-sm text-white bg-azul rounded-md hover:bg-blue-100 hover:text-blue-700"
                  onClick={() => navigate("/historialMedico", { state: afil })}
                >
                  Historial Médico
                </button>

                <button
                  type="button"
                  className="w-full py-2 text-sm text-white bg-azul rounded-md hover:bg-blue-100 hover:text-blue-700"
                  onClick={() =>
                    navigate("/fichaMedicaAFiliado", { state: afil })
                  }
                >
                  Ficha Medica
                </button>

                <button
                  type="button"
                  className="w-full py-2 text-sm text-white bg-azul rounded-md hover:bg-blue-100 hover:text-blue-700"
                  onClick={() => navigate("/contactos", { state: afil })}
                >
                  Contactos
                </button>
              </div>
            </details>
          </li>
        ))}
      </ul>

      {/* Modal para actualizar rol */}
      <ModalActualizarRol
        isOpen={activeModal === "rol"}
        onClose={closeModal}
        user={selectedUser}
        reloadProfile={reloadProfile}
      />

      {/* Modal para actualizar nombre */}
      <ModalActualizarNombreAfiliado
        isOpen={activeModal === "name"}
        onClose={closeModal}
        user={selectedUser}
        reloadProfile={reloadProfile}
      />

      {/* Modal para actualizar contraseña */}
      <ModalActualizarPassword
        isOpen={activeModal === "pass"}
        onClose={closeModal}
        userDocument={selectedUser?.documento}
        reloadProfile={reloadProfile}
      />

      {/* Modal para detalles del afiliado */}
      <ModalDetallesAfiliado
        isOpen={activeModal === "detail"}
        onClose={closeModal}
        user={selectedUser}
      />

      {/* Modal para Historial de consultas medicas */}
      <ModalHistorialConsultas
        isOpen={activeModal === "consultas"}
        onClose={closeModal}
        user={selectedUser}
      />
    </>
  );
};

export default Afiliados;
