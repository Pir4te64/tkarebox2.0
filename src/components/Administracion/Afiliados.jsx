import React, { useState } from "react";
import { FaIdCard } from "react-icons/fa";
import ModalActualizarRol from "./Modales/ModalActualizarRol";
import ModalActualizarNombreAfiliado from "./Modales/ModalActualizarNombreAfiliado"; // Importa tu nuevo modal

const Afiliados = ({ afiliados, reloadProfile }) => {
  const [isRolModalOpen, setIsRolModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [userSelected, setUserSelected] = useState(null);

  // Abre el modal de rol
  const handleOpenModalRol = (afil) => {
    setUserSelected(afil);
    setIsRolModalOpen(true);
  };

  // Cierra el modal de rol
  const handleCloseModalRol = () => {
    setIsRolModalOpen(false);
    setUserSelected(null);
  };

  // Abre el modal de nombre
  const handleOpenModalName = (afil) => {
    setUserSelected(afil);
    setIsNameModalOpen(true);
  };

  // Cierra el modal de nombre
  const handleCloseModalName = () => {
    setIsNameModalOpen(false);
    setUserSelected(null);
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

            <div className="flex flex-col md:flex-row gap-2">
              <button
                type="button"
                className="w-full py-2 text-sm text-white bg-azul rounded-md hover:bg-blue-100 hover:text-blue-700"
                onClick={() => handleOpenModalRol(afil)}
              >
                Cambiar Rol
              </button>

              <button
                type="button"
                className="w-full py-2 text-sm text-white bg-azul rounded-md hover:bg-blue-100 hover:text-blue-700"
                onClick={() => handleOpenModalName(afil)}
              >
                Actualizar Nombre
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal para actualizar rol */}
      <ModalActualizarRol
        isOpen={isRolModalOpen}
        onClose={handleCloseModalRol}
        user={userSelected}
        reloadProfile={reloadProfile}
      />

      {/* Modal para actualizar nombre (Afiliado) */}
      <ModalActualizarNombreAfiliado
        isOpen={isNameModalOpen}
        onClose={handleCloseModalName}
        user={userSelected}
        reloadProfile={reloadProfile}
      />
    </>
  );
};

export default Afiliados;
