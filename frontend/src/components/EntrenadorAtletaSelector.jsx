import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const EntrenadorAtletaSelector = ({ user, onEntrenadorChange, onAtletaChange }) => {
  const [entrenadores, setEntrenadores] = useState([]);
  const [selectedEntrenador, setSelectedEntrenador] = useState("");
  const [atletas, setAtletas] = useState([]);
  const [selectedAtleta, setSelectedAtleta] = useState("");

  useEffect(() => {
    if (user.rol === "admin" || user.rol === "entrenador") {
      obtenerEntrenadores();
    }
    if (user.rol === "entrenador") {
      obtenerEntrenadorId(user.id);
    }
  }, [user]);
  
  const obtenerEntrenadores = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/entrenadores/todos`
      );
      setEntrenadores(response.data);
    } catch (error) {
      console.error("Error al cargar entrenadores:", error);
    }
  };
  
  const obtenerEntrenadorId = async (userId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/entrenadores?id_usuario=${userId}`
      );
      const entrenadorId = response.data.data[0]?.id || "";
      if (entrenadorId) {
        setSelectedEntrenador(entrenadorId);
        onEntrenadorChange(entrenadorId);
        obtenerAtletas(entrenadorId);
      }
    } catch (error) {
      console.error("Error al obtener el id del entrenador:", error);
    }
  };

  const obtenerAtletas = async (entrenadorId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/entrenadores/${entrenadorId}/atletas`
      );
      setAtletas(response.data.data);
    } catch (error) {
      console.error("Error al obtener los atletas del entrenador", error);
    }
  };

  const handleEntrenadorChange = (event) => {
    const entrenadorId = event.target.value;
    setSelectedEntrenador(entrenadorId);
    onEntrenadorChange(entrenadorId);
    obtenerAtletas(entrenadorId);
  };

  const handleAtletaChange = (event) => {
    const atletaId = event.target.value;
    setSelectedAtleta(atletaId);
    onAtletaChange(atletaId);
  };

  return (
    <div className="mt-10">
      {user.rol === "admin" && (
        <div className="flex justify-between mb-3">
          <FormControl variant="outlined" className="form-control mb-3 tercio">
            <InputLabel id="entrenador-label">Seleccionar Entrenador</InputLabel>
            <Select
              labelId="entrenador-label"
              id="entrenador-select"
              value={selectedEntrenador}
              onChange={handleEntrenadorChange}
              label="Seleccionar Entrenador"
            >
              <MenuItem value="">Seleccionar Entrenador</MenuItem>
              {entrenadores.map((entrenador) => (
                <MenuItem key={entrenador.id} value={entrenador.id}>
                  {entrenador.apodo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedEntrenador && (
            <FormControl variant="outlined" className="form-control mb-3 tercio">
              <InputLabel id="atleta-label">Seleccionar Atleta</InputLabel>
              <Select
                labelId="atleta-label"
                id="atleta-select"
                value={selectedAtleta}
                onChange={handleAtletaChange}
                label="Seleccionar Atleta"
              >
                <MenuItem value="">Seleccionar Atleta</MenuItem>
                {atletas.map((atleta) => (
                  <MenuItem key={atleta.id} value={atleta.id}>
                    {atleta.apodo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </div>
      )}

      {user.rol === "entrenador" && (
        <FormControl variant="outlined" className="form-control mb-3 tercio">
          <InputLabel id="atleta-label">Seleccionar Atleta</InputLabel>
          <Select
            labelId="atleta-label"
            id="atleta-select"
            value={selectedAtleta}
            onChange={handleAtletaChange}
            label="Seleccionar Atleta"
          >
            <MenuItem value="">Seleccionar Atleta</MenuItem>
            {atletas.map((atleta) => (
              <MenuItem key={atleta.id} value={atleta.id}>
                {atleta.apodo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default EntrenadorAtletaSelector;