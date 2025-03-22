import React, { useEffect, useState } from "react";
import { FaUser, FaIdCard } from "react-icons/fa";
import { profileAdminGET } from "./PerfilAdminGET"; // Tu archivo de servicio
import TarjetaAdmin from "./AdminFunciones";
import Afiliados from "./Afiliados";

const Administracion = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Llamamos a la función GET automáticamente al montar
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileAdminGET();
      setProfile(data);
    } catch (err) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  // Llamar al montar
  useEffect(() => {
    fetchProfile();
  }, []);

  // Manejo de estados
  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4">Error: {error}</div>;
  if (!profile) return <div className="p-4">No hay datos de perfil.</div>;

  // Render final
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center ">
      {/* Tarjeta superior con nombre y documento */}
      <TarjetaAdmin profile={profile} reloadProfile={fetchProfile} />

      {/* Lista de afiliados */}
      <div className="bg-white w-full max-w-xl p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Lista de Afiliados
        </h3>

        <Afiliados afiliados={profile.afiliados} reloadProfile={fetchProfile} />
      </div>
    </div>
  );
};

export default Administracion;
