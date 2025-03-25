import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaIdCard } from "react-icons/fa";
import registerImg from "../../assets/images/register.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../utils/Api";

const Registro = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [document, setDocument] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      document: document.trim(),
      pseudonym: document.trim(),
      name: name.trim(),
      password: password.trim(),
    };

    try {
      const response = await axios.post(API.REGISTER, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.data.message || "Error en el registro");
      }

      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message || error.message || "No se pudo registrar"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center w-full max-w-md">
        <img src={registerImg} alt="Registro" className="w-36 h-36 mb-4" />

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Registrarse
        </h2>

        <form className="w-full space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Documento (RUT)
            </label>
            <div className="relative">
              <FaIdCard className="absolute top-3 left-3 text-azul" />
              <input
                type="text"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                placeholder="Documento"
                className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 outline-none focus:border-azul transition"
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Nombre
            </label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-azul" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
                className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 outline-none focus:border-azul transition"
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-azul" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full pl-10 pr-10 py-2 border-b-2 border-gray-300 outline-none focus:border-azul transition"
              />
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-azul hover:bg-azul-700/80 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-4 text-sm">
          <Link to="/login" className="text-azul hover:underline">
            ¿Ya tienes una cuenta? Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;
