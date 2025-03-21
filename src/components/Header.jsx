import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-sm">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center">
        <button onClick={() => navigate(-1)} className="text-azul mr-4">
          <FaArrowLeft size={20} />
        </button>
        <span className="font-medium text-lg">{title}</span>
      </div>
    </div>
  );
};

export default Header;
