// src/components/Layout.jsx
import React from "react";
import { FaHome, FaUser, FaBell, FaCog, FaUpload } from "react-icons/fa";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow">{children}</div>

      {/* Tabs inferiores */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-between px-4 py-2 text-azul">
        <Link to="/home" className="flex flex-col items-center">
          <FaHome size={20} />
          <span className="text-xs">Inicio</span>
        </Link>
        <Link to="/perfilDependiente" className="flex flex-col items-center">
          <FaUser size={20} />
          <span className="text-xs">Perfil</span>
        </Link>
        <Link to="/administracion" className="flex flex-col items-center">
          <FaBell size={20} />
          <span className="text-xs">Admin</span>
        </Link>
        <Link to="/subir" className="flex flex-col items-center">
          <FaUpload size={20} />
          <span className="text-xs">Subir</span>
        </Link>
        <Link to="/config" className="flex flex-col items-center">
          <FaCog size={20} />
          <span className="text-xs">Config</span>
        </Link>
      </div>
    </div>
  );
};

export default Layout;
