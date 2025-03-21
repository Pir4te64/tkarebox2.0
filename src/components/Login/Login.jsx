import React, { useState, useContext } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import loginImg from "../../assets/images/login2.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../utils/Api";
import { AuthContext } from "../../utils/AuthProvider";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = API.LOGIN;

    try {
      const response = await axios.post(
        url,
        {
          username: rut.trim(),
          password: password.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      //console.log("Respuesta:", response.data);
      const { token, username, role } = response.data.body;
      login(token, username, role);

      alert("¡Login exitoso!");
      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión. Por favor, verifica tus credenciales.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center w-full max-w-md">
        <img src={loginImg} alt="Login" className="w-36 h-36 mb-4" />

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Iniciar Sesión
        </h2>

        <form className="w-full space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Usuario "RUT"
            </label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-azul" />
              <input
                type="text"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                placeholder="Ingrese su RUT"
                className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 outline-none focus:border-azul transition"
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Contraseña:
            </label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-azul" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full pl-10 pr-10 py-2 border-b-2 border-gray-300 outline-none focus:border-indigo-500 transition"
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
            Ingresar
          </button>
        </form>

        <div className="mt-4 text-sm">
          <Link to="/register" className="text-azul hover:underline">
            ¿No tienes una cuenta? Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
