import { Routes, Route, Link } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Home";
import Config from "./pages/Config";
import Perfil from "./pages/PerfilDependiente";
import AdministracionPage from "./pages/Administracion";
import SubirPage from "./pages/Subir";
import FichaMedicaPage from "./pages/FichaMedica";
import DetallesPage from "./pages/Detalles";
import ContactosPage from "./pages/Contactos";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
import ExamenesLaboratorioPage from "./pages/ExamenesLaboratorio";
import ExamenesRecetaPage from "./pages/ExamenesReceta";
import HistorialMedicoPage from "./pages/HistorialMedico";
import ExamenesLaboratorioEditarPage from "./pages/ExamenesLaboratorioEditar";
function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/config" element={<Config />} />
          <Route path="/perfilDependiente" element={<Perfil />} />
          <Route path="/administracion" element={<AdministracionPage />} />
          <Route path="/subir" element={<SubirPage />} />
          <Route path="/fichaMedica" element={<FichaMedicaPage />} />
          <Route path="/detalles" element={<DetallesPage />} />
          <Route path="/contactos" element={<ContactosPage />} />
          <Route
            path="/examenesLaboratorio"
            element={<ExamenesLaboratorioPage />}
          />
          <Route
            path="/examenesLaboratorioEditar"
            element={<ExamenesLaboratorioEditarPage />}
          />
          <Route path="/examenesReceta" element={<ExamenesRecetaPage />} />
          <Route path="/historialMedico" element={<HistorialMedicoPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
