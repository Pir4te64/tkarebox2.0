import React from "react";
import ExamenesLab from "../components/ExamenesLaboratorio/ExamenesLab";
import Layout from "../components/Layout";
import Header from "../components/Header";
const ExamenesLaboratorioPage = () => {
  return (
    <Layout>
      <Header title={"Exámenes de Laboratorio"} />
      <ExamenesLab />
    </Layout>
  );
};

export default ExamenesLaboratorioPage;
