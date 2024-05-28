import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosConfig from "../config/axios-config";
import { MenuItem, TextField } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

function SelectEjercicios({
  placeholder,
  onExerciseSelect,
  paginaActual,
  setPaginaActual,
}) {
  const [ejercicios, setEjercicios] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [initialExerciseId, setInitialExerciseId] = useState("");

  useEffect(() => {
    obtenerEjercicios();
  }, [paginaActual, searchTerm]);

  useEffect(() => {
    if (initialExerciseId) {
      
      setSelectedExercise(initialExerciseId);
      
      obtenerNombreEjercicio(initialExerciseId);
    }
  }, [initialExerciseId]);

  const obtenerEjercicios = async () => {
    if (loading) return;
    setLoading(true);
    try {
      let response;
      if (searchTerm) {
        response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/ejercicios/nombre?nombre=${searchTerm}&page=${paginaActual}`
          , axiosConfig);
      } else {
        response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/ejercicios/select?page=${paginaActual}`
          , axiosConfig);
      }
      setEjercicios((prevEjercicios) => [
        ...prevEjercicios,
        ...response.data.data,
      ]);
      setHasMore(
        response.data.meta.current_page < response.data.meta.last_page
      );
    } catch (error) {
      console.error("Error al obtener ejercicios:", error);
    } finally {
      setLoading(false);
    }
  };

  const obtenerNombreEjercicio = async (exerciseId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/ejercicios/${exerciseId}`
      );
      setSelectedExercise(response.data.nombre);
    } catch (error) {
      console.error("Error al obtener el nombre del ejercicio:", error);
    }
  };


  const handleExerciseSelect = (exerciseId, exerciseName) => {
    setSelectedExercise(exerciseName);
    onExerciseSelect(exerciseId);
    setOpen(false); // Close the select when an exercise is selected
  };

  const handleScroll = (event) => {
    const target = event.target;
    if (
      target.scrollHeight - target.scrollTop - target.clientHeight < 50 &&
      !loading &&
      hasMore
    ) {
      setPaginaActual((prevPaginaActual) => prevPaginaActual + 1);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setSelectedExercise(""); 
    setPaginaActual(1); 
  };

  return (
    <div style={{ position: "relative" }}>
      <TextField
        type="text"
        placeholder={placeholder}
        value={selectedExercise || searchTerm}
        onChange={handleInputChange}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "400px",
            overflowY: "auto",
            backgroundColor: "#fff",
            zIndex: 999,
          }}
          onScroll={handleScroll}
        >
          <InfiniteScroll
            dataLength={ejercicios.length}
            next={obtenerEjercicios}
            hasMore={hasMore}
            loader={<MenuItem disabled>Cargando más ejercicios...</MenuItem>}
            scrollableTarget="scrollableDiv"
          >
            <div id="scrollableDiv">
              {ejercicios.map((ejercicio) => (
                <MenuItem
                  key={ejercicio.id}
                  onClick={() =>
                    handleExerciseSelect(ejercicio.id, ejercicio.nombre)
                  }
                  style={{ cursor: "pointer" }}
                >
                  {ejercicio.nombre}
                </MenuItem>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}

export default SelectEjercicios;