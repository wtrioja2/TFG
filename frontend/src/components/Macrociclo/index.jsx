import React, { useState, useEffect } from "react";
import axios from "axios";
import EntrenadorAtletaSelector from "../EntrenadorAtletaSelector";

export default function index({user}) {

  const [selectedEntrenador, setSelectedEntrenador] = useState("");
  const [selectedAtleta, setSelectedAtleta] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModalMacrociclo, setShowFormModalMacrociclo] = useState(false);

  const handleEntrenadorChange = (entrenadorId) => {
    setSelectedEntrenador(entrenadorId);
  };

  const handleAtletaChange = (atletaId) => {
    setSelectedAtleta(atletaId);
  };

  if (!user) {
    return <div>Cargando...</div>; // Otra lógica de carga
  }

  return (
    <div className="mt-10">
      <h1 className="w-full text-2xl text-gray-800 font-bold leading-tight text-center">
        Planificación
      </h1>

      <EntrenadorAtletaSelector
        user={user}
        onEntrenadorChange={handleEntrenadorChange}
        onAtletaChange={handleAtletaChange}
      />
    </div>
  );
}
