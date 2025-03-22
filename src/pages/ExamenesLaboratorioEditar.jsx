import React from "react";
import ExamenesLaboratorioEditar from "../components/HistorialMedico/ExamenesLaboratorioEditar";
import Layout from "../components/Layout";
import Header from "../components/Header";
const ExamenesLaboratorioEditarPage = () => {
  return (
    <Layout>
      <Header title="Editar Examenes de Laboratorio" />
      <ExamenesLaboratorioEditar />
    </Layout>
  );
};

export default ExamenesLaboratorioEditarPage;
