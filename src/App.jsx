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
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
