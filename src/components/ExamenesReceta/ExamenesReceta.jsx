import React from "react";
import { useLocation } from "react-router-dom";

const ExamenesReceta = () => {
  const location = useLocation();
  const { ficha } = location.state || {};
  console.log(ficha);
  return <div>ExamenesReceta</div>;
};

export default ExamenesReceta;
