import React from "react";
import FichaMedicaAfiliado from "../components/Administracion/FichaMedicaAfiliado/FichaMedicaAfiliado";
import Layout from "../components/Layout";
import Header from "../components/Header";

export const FichaMedicaAFiliadoPage = () => {
  return (
    <Layout>
      <Header title="Ficha Medica Afiliado" />
      <FichaMedicaAfiliado />
    </Layout>
  );
};
