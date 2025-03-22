import React from "react";
import Layout from "../components/Layout";
import ExamenesReceta from "../components/ExamenesReceta/ExamenesReceta";
import Header from "../components/Header";
const ExamenesRecetaPage = () => {
  return (
    <Layout>
      <Header title={"Examenes de Receta"} />
      <ExamenesReceta />
    </Layout>
  );
};

export default ExamenesRecetaPage;
