import React from "react";
import Layout from "../components/Layout";
import HistorialMedico from "../components/HistorialMedico/HistorialMedico";
import Header from "../components/Header";
const HistorialMedicoPage = () => {
  return (
    <Layout>
      <Header title={"Historial Médico"} />
      <HistorialMedico />
    </Layout>
  );
};

export default HistorialMedicoPage;
