import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosConfig from "../../config/axios-config";
import MyDatePicker from "../MyDatePicker";

export default function RmFormModal({
  setShowFormModal,
  formMode,
  rmId,
  defaultRmData,
  fetchRms,
  ejercicios,
  selectedAtleta,
}) {
  const [selectedDate, setSelectedDate] = useState(defaultRmData?.fecha ? new Date(defaultRmData.fecha) : new Date());
  const [ejercicioId, setEjercicioId] = useState(defaultRmData?.id);
  const [rmValue, setRmValue] = useState(defaultRmData?.rm);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    if (defaultRmData && defaultRmData.ejercicio_id) {
      const exercise = ejercicios.find(
        (exercise) => exercise.id === defaultRmData.ejercicio_id
      );
      setSelectedExercise(exercise);
      setEjercicioId(defaultRmData.ejercicio_id);
    }
    console.log("Default RM Data:", defaultRmData);
    console.log("Ejercicio ID inicial:", defaultRmData?.ejercicio_id);
  }, [defaultRmData, ejercicios]);

  const refreshValues = () => {
    setSelectedDate(new Date());
    setEjercicioId("");
    setRmValue("");
  };

  const handleCreateRm = () => {
    const rmData = {
      fecha: selectedDate.toISOString().split("T")[0],
      ejercicio_id: ejercicioId,
      rm: rmValue,
      atleta_id: selectedAtleta,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/v1/rm`, rmData, axiosConfig)
      .then((response) => {
        setShowFormModal(false);
        refreshValues();
        fetchRms(`${import.meta.env.VITE_API_URL}/api/v1/rm/indexById?atleta_id=${selectedAtleta}`);
      })
      .catch((error) => {
        console.error("Error creating RM:", error);
      });
  };

  const handleUpdateRm = (rmData) => {
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/v1/rm/${rmId}`,
        rmData,
        axiosConfig
      )
      .then((response) => {
        setShowFormModal(false);
      })
      .finally(() => {
        fetchRms(`${import.meta.env.VITE_API_URL}/api/v1/rm/indexById?atleta_id=${selectedAtleta}`);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDate =
    selectedDate instanceof Date && !isNaN(selectedDate)
      ? selectedDate.toISOString().split("T")[0]
      : null;
    if (formMode === "create") {
      handleCreateRm();
    } else {
      handleUpdateRm({
        fecha: formattedDate,
        ejercicio_id: ejercicioId,
        rm: rmValue,
        atleta_id: selectedAtleta,  
      });
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date instanceof Date && !isNaN(date) ? date : new Date());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    switch (name) {
      case "ejercicio_id":
        setEjercicioId(value);
        break;
      case "rm":
        setRmValue(value);
        break;
      default:
        break;
    }
  };

  const handleExerciseChange = (e) => {
    const exerciseId = parseInt(e.target.value);
    const exercise = ejercicios.find((exercise) => exercise.id === exerciseId);
    setSelectedExercise(exercise);
    setEjercicioId(exerciseId);
  };

  return (
    <div className="bg-gray-500 bg-opacity-20 h-full w-full fixed top-0 left-0 text-gray-600">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white w-[800px] mx-auto rounded-lg shadow-lg p-6">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">
              {formMode === "create" ? "Crear " : "Actualizar "} RM{" "}
            </h1>
            <button onClick={() => setShowFormModal(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700 font-medium mb-2">Fecha</label>
              <MyDatePicker
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700 font-medium mb-2">
                Ejercicio
              </label>
              <select
                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                name="ejercicio_id"
                value={selectedExercise ? selectedExercise.id : ""}
                onChange={handleExerciseChange}
              >
                <option value="">Seleccione un ejercicio</option>
                {ejercicios.map((ejercicio) => (
                  <option key={ejercicio.id} value={ejercicio.id}>
                    {ejercicio.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700 font-medium mb-2">RM</label>
              <input
                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                type="number"
                name="rm"
                value={rmValue}
                onChange={handleChange}
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
