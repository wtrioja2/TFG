import React, { useState, useEffect } from "react";
import axios from "axios";
import EntrenadorAtletaSelector from "../EntrenadorAtletaSelector";
import CustomCalendar from "../CustomCalendar";

export default function index({ user }) {
  const [selectedEntrenador, setSelectedEntrenador] = useState("");
  const [selectedAtleta, setSelectedAtleta] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModalMacrociclo, setShowFormModalMacrociclo] = useState(false);
  const [calendarioData, setCalendarioData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleEntrenadorChange = (entrenadorId) => {
    setSelectedEntrenador(entrenadorId);
  };

  const handleAtletaChange = (atletaId) => {
    setSelectedAtleta(atletaId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const macrociclosResponse = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/macrociclos/indexById?atleta_id=${selectedAtleta}`
        );
        const mesociclosResponse = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/mesociclos/indexById?atleta_id=${selectedAtleta}`
        );
        const microciclosResponse = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/microciclos/indexById?atleta_id=${selectedAtleta}`
        );
        const sesionesResponse = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/sesiones/indexById?atleta_id=${selectedAtleta}`
        );

        const macrociclos = macrociclosResponse.data.data;
        const mesociclos = mesociclosResponse.data.data;
        const microciclos = microciclosResponse.data.data;
        const sesiones = sesionesResponse.data.data;

        // Aquí puedes realizar cualquier procesamiento adicional de los datos si es necesario
        setCalendarioData({
          macrociclos,
          mesociclos,
          microciclos,
          sesiones,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener datos del calendario:", error);
        setLoading(false);
      }
    };

    if (selectedAtleta) {
      fetchData();
    }
  }, [selectedAtleta]);

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

      {loading ? (
        <div>Cargando datos del calendario...</div>
      ) : calendarioData ? (
        <div>
          {/* Aquí puedes renderizar los datos del calendario */}
          <pre>{JSON.stringify(calendarioData, null, 2)}</pre>
          <CustomCalendar/>
        </div>
      ) : (
        <div>No se encontraron datos del calendario para este atleta.</div>
      )}
    </div>
  );
}
