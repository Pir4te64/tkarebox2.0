import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-sm flex items-center px-4 py-3">
      <button onClick={() => navigate(-1)} className="text-azul mr-4">
        <FaArrowLeft size={20} />
      </button>
      <span className="font-medium text-lg">{title}</span>
    </div>
  );
};

export default Header;
