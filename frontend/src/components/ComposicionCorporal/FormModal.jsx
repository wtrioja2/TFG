import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosConfig from "../../config/axios-config";
import MyDatePicker from "../MyDatePicker";

export default function RmFormModal({
  setShowFormModal,
  formMode,
  composicionCorporalId,
  defaultComposicionCorporalData,
  fetchComposicionesCorporales,
  selectedAtleta,
}) {
  const [selectedDate, setSelectedDate] = useState(defaultComposicionCorporalData?.fecha ? new Date(defaultComposicionCorporalData.fecha) : new Date());
  const [altura, setAltura] = useState(defaultComposicionCorporalData?.altura || "");
  const [peso, setPeso] = useState(defaultComposicionCorporalData?.peso || "");

  const refreshValues = () => {
    setSelectedDate(new Date());
    setAltura("");
    setPeso("");
  };

  const handleCreateComposicionCorporal = () => {
    const composicionCorporalData = {
      fecha: selectedDate.toISOString().split("T")[0],
      altura,
      peso,
      atleta_id: selectedAtleta,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/v1/composicioncorporal`, composicionCorporalData, axiosConfig)
      .then((response) => {
        setShowFormModal(false);
        refreshValues();
        fetchComposicionesCorporales();
      })
      .catch((error) => {
        console.error("Error creating Composición Corporal:", error);
      });
  };

  const handleUpdateComposicionCorporal = () => {
    const composicionCorporalData = {
      fecha: selectedDate.toISOString().split("T")[0],
      altura,
      peso,
      atleta_id: selectedAtleta,
    };
  
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/v1/composicioncorporal/${composicionCorporalId}`,
        composicionCorporalData,
        axiosConfig
      )
      .then((response) => {
        setShowFormModal(false);
      })
      .finally(() => {
        fetchComposicionesCorporales();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formMode === "create") {
      handleCreateComposicionCorporal();
    } else {
      handleUpdateComposicionCorporal();
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date instanceof Date && !isNaN(date) ? date : new Date());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "altura":
        setAltura(value);
        break;
      case "peso":
        setPeso(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-gray-500 bg-opacity-20 h-full w-full fixed top-0 left-0 text-gray-600">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white w-[800px] mx-auto rounded-lg shadow-lg p-6">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">
              {formMode === "create" ? "Crear " : "Actualizar "} Composición Corporal{" "}
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
              <label className="text-gray-700 font-medium mb-2">Altura (cm)</label>
              <input
                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                type="number"
                name="altura"
                value={altura}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700 font-medium mb-2">Peso (kg)</label>
              <input
                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                type="number"
                name="peso"
                value={peso}
                onChange={handleChange}
                required
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