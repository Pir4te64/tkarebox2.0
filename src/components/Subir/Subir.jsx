import React, { useState } from "react";
import postRequest from "./SendPDF";

const Subir = () => {
  const [selectedOption, setSelectedOption] = useState("LABORATORY");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileName, setPdfFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Maneja selección de archivo PDF
  const handleFilePick = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setPdfFileName(file.name);
      setFeedback("");
    } else {
      setPdfFile(null);
      setPdfFileName("");
      setFeedback("Por favor, selecciona un archivo PDF válido.");
    }
  };

  // Envío del PDF usando postRequest
  const handleSend = async () => {
    if (!pdfFile) {
      setFeedback("No has seleccionado un archivo.");
      return;
    }
    if (!selectedOption) {
      setFeedback("Por favor selecciona un tipo de análisis.");
      return;
    }

    setLoading(true);
    setFeedback("");

    try {
      // FormData con el archivo
      const formData = new FormData();
      // Tercer argumento es el nombre del archivo (recomendado para el servidor)
      formData.append("file", pdfFile);
      formData.append("tipoAnalisis", encodeURIComponent(selectedOption));
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      // Llamamos a postRequest
      const responseData = await postRequest(formData);
      console.log("Respuesta del servidor:", responseData);

      setFeedback("El archivo fue enviado correctamente.");
      // Limpia el estado
      setPdfFile(null);
      setPdfFileName("");
    } catch (error) {
      setFeedback(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Envío de Datos
        </h2>

        {/* Select: Tipo de envío */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Selecciona una opción:
        </label>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-indigo-500"
        >
          <option value="LABORATORY">Exámenes de Laboratorio</option>
          <option value="RECIPE">Recetas</option>
          <option value="IMAGENOLOGY">Informes de Imágenes</option>
        </select>

        {/* Botón para seleccionar archivo PDF */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecciona un archivo PDF:
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFilePick}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer focus:outline-none file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 mb-2"
        />

        {/* Muestra el nombre del archivo si se seleccionó */}
        {pdfFileName && (
          <p className="text-sm text-gray-700 mb-4">
            Archivo seleccionado:{" "}
            <span className="font-medium">{pdfFileName}</span>
          </p>
        )}

        {/* Mensaje de feedback */}
        {feedback && (
          <p className="text-center mb-4 text-sm font-medium text-green-600">
            {feedback}
          </p>
        )}

        {/* Botón Enviar / Loading */}
        {loading ? (
          <>
            <button
              disabled
              className="w-full bg-green-600 text-white font-semibold py-2 rounded cursor-not-allowed opacity-70"
            >
              Enviando...
            </button>
            <p className="mt-2 text-center text-gray-700 text-sm">
              Petición en curso...
            </p>
          </>
        ) : (
          <button
            onClick={handleSend}
            disabled={!pdfFile}
            className={`w-full ${
              pdfFile ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"
            } text-white font-semibold py-2 rounded transition duration-300 mt-2`}
          >
            Enviar
          </button>
        )}
      </div>
    </div>
  );
};

export default Subir;
