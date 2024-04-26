import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import SelectEjercicios from "./SelectEjercicios";

export default function Index() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
  };

  return (
    <div>
      <h1>Entrenador Dashboard</h1>
      <SelectEjercicios
        placeholder="Selecciona un ejercicio"
        paginaActual={paginaActual}
        onExerciseSelect={handleExerciseSelect}
        setPaginaActual={setPaginaActual}
      />
    </div>
  );
}