import React, { useState } from "react";
import { FaIdCard, FaUser, FaLock } from "react-icons/fa";
import loginImg from "../../assets/images/login2.png";
import { creacionDependientePOST } from "./creacionDependientePOST";

const DependientePerfil = () => {
  // Estados para controlar los campos
  const [doc, setDoc] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");

  // Estados para control visual
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCreate = async () => {
    setLoading(true);
    setAlertVisible(false);
    setErrorMsg("");

    try {
      // Llamada al servicio
      const responseData = await creacionDependientePOST({
        document: doc,
        name: nombre,
        password,
      });

      console.log("Dependiente creado:", responseData);

      // Muestra alerta de éxito
      setAlertVisible(true);
    } catch (error) {
      console.error("Error creando dependiente:", error);
      // Muestra mensaje de error
      setErrorMsg(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100">
      {/* Sección superior con color y la imagen */}
      <div className="flex-grow h-[400px] bg-azul rounded-b-3xl shadow-xl p-8 flex flex-col items-center justify-center">
        <img
          src={loginImg}
          alt="Dependiente"
          className="w-40 h-40 mb-4 object-cover"
        />
      </div>

      {/* Sección inferior con el formulario */}
      <div className="-mt-12 px-4 w-full max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Registrar Dependiente
          </h2>

          {/* Campo: Documento */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Documento
            </label>
            <div className="relative">
              <span className="absolute top-2 left-2 text-gray-400">
                <FaIdCard />
              </span>
              <input
                type="text"
                placeholder="Documento"
                className="pl-8 pr-2 py-2 border-b-2 border-gray-300 w-full focus:outline-none focus:border-azul transition"
                value={doc}
                onChange={(e) => setDoc(e.target.value)}
              />
            </div>
          </div>

          {/* Campo: Nombre */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nombre
            </label>
            <div className="relative">
              <span className="absolute top-2 left-2 text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                placeholder="Nombre"
                className="pl-8 pr-2 py-2 border-b-2 border-gray-300 w-full focus:outline-none focus:border-azul transition"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
          </div>

          {/* Campo: Contraseña */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute top-2 left-2 text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                placeholder="Contraseña"
                className="pl-8 pr-2 py-2 border-b-2 border-gray-300 w-full focus:outline-none focus:border-azul transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Botón Registrar */}
          <button
            className="bg-azul hover:bg-azul/90 text-white font-semibold py-2 px-4 rounded w-full transition duration-300"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar Dependiente"}
          </button>

          {/* Simulación de loading */}
          {loading && (
            <div className="mt-2 text-center">
              <span className="text-azul text-sm">Cargando...</span>
            </div>
          )}

          {/* Mensaje de error */}
          {errorMsg && (
            <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">
              <p className="font-medium">Error: {errorMsg}</p>
            </div>
          )}

          {/* Alerta de éxito */}
          {alertVisible && !errorMsg && (
            <div className="mt-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded">
              <p className="font-medium">
                Dependiente registrado correctamente.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DependientePerfil;
