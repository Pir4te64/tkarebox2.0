import React from "react";
import Header from "../components/Header";
import Contactos from "../components/Contactos/Contactos";
import Layout from "../components/Layout";
const ContactosPage = () => {
  return (
    <Layout>
      <Header title={"Contactos"} />
      <Contactos />
    </Layout>
  );
};

export default ContactosPage;
