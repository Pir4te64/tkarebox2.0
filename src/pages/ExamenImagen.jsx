import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import ExamenImagen from "../components/ExamenImagen/ExamenImagen";
const ExamenImagenPage = () => {
  return (
    <Layout>
      <Header title={"Examen Imagen"} />
      <ExamenImagen />
    </Layout>
  );
};

export default ExamenImagenPage;
