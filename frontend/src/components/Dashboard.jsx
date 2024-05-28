import { useState, useEffect } from "react";
import axios from "axios";
import axiosConfig from "../config/axios-config";
import CustomCalendar from "./CustomCalendar";
import EntrenadorAtletaSelector from "./EntrenadorAtletaSelector";

export default function Dashboard({ user }) {
  const [selectedEntrenador, setSelectedEntrenador] = useState("");
  const [selectedAtleta, setSelectedAtleta] = useState(
    localStorage.getItem("atleta_id")
  );
  const [sesionesData, setSesionesData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleEntrenadorChange = (entrenadorId) => {
    setSelectedEntrenador(entrenadorId);
  };

  const handleAtletaChange = (atletaId) => {
    setSelectedAtleta(atletaId);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchLineasSesion = async (date) => {
    try {
      const formattedDate = formatDate(date);
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/lineassesion/indexById?atleta_id=${selectedAtleta}&fecha=${formattedDate}`, axiosConfig
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al cargar las líneas de sesión:", error);
      return [];
    }
  };

  const fetchEjercicios = async (id) => {
    const url = `${
      import.meta.env.VITE_API_URL
    }/api/v1/ejercicios/nombreyfoto/${id}`;
    try {
      const response = await axios.get(url, axiosConfig);
      return response.data;
    } catch (error) {
      console.error("Error al cargar los ejercicios:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const sesionesResponse = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/sesiones/indexById?atleta_id=${selectedAtleta}`, axiosConfig
        );
        const sesiones = sesionesResponse.data.data;
        setSesionesData(sesiones);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener datos del calendario:", error);
        setLoading(false);
      }
    };

    // Llama a fetchData solo si selectedAtleta no es null
    if (selectedAtleta) {
      fetchData();
    }
  }, [selectedAtleta]);

  return (
    <div>
      {(user.rol === "admin" || user.rol === "entrenador") && (
        <EntrenadorAtletaSelector
          user={user}
          onEntrenadorChange={handleEntrenadorChange}
          onAtletaChange={handleAtletaChange}
        />
      )}

      <CustomCalendar
        sesionesData={sesionesData}
        selectedAtleta={selectedAtleta}
        fetchLineasSesion={fetchLineasSesion}
        fetchEjercicios={fetchEjercicios}
      />
    </div>
  );
}
