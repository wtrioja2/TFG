import React, { useState } from "react";
import axios from "axios";
import axiosConfig from "../../config/axios-config";

export default function FormModalMacrociclo({
  setShowFormModalMacrociclo,
  formMode,
  macrocicloId,
  defaultMacrocicloData,
  fetchMacrociclos,
  selectedAtleta,
}) {
  const [nombre, setNombre] = useState(defaultMacrocicloData.nombre || "");
  const [descripcion, setDescripcion] = useState(defaultMacrocicloData.descripcion || "");

  const refreshValues = () => {
    setNombre("");
    setDescripcion("");
  };

  const handleCreateMacrociclo = () => {
    const macrocicloData = {
      atleta_id: selectedAtleta,
      nombre,
      descripcion,
    };

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/v1/macrociclos`,
        macrocicloData,
        axiosConfig
      )
      .then((response) => {
        setShowFormModalMacrociclo(false);
        refreshValues();
        fetchMacrociclos();
      })
      .catch((error) => {
        // Handle error
        console.error("Error al crear el macrociclo:", error);
      });
  };

  const handleUpdateMacrociclo = () => {
    const macrocicloData = {
      nombre,
      descripcion,
    };

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/v1/macrociclos/${macrocicloId}`,
        macrocicloData,
        axiosConfig
      )
      .then((response) => {
        setShowFormModalMacrociclo(false);
      })
      .finally(() => {
        fetchMacrociclos();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formMode === "create") {
      handleCreateMacrociclo();
    } else {
      handleUpdateMacrociclo();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "nombre":
        setNombre(value);
        break;
      case "descripcion":
        setDescripcion(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-gray-500 bg-opacity-20 h-full w-full fixed top-0 left-0 text-gray-600" style={{ zIndex: 9999 }}>
      <div className="flex justify-center items-center h-full">
        <div className="bg-white w-[800px] mx-auto rounded-lg shadow-lg p-6">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">
              {formMode === "create" ? "Crear " : "Actualizar "} Macrociclo{" "}
            </h1>
            <button onClick={() => setShowFormModalMacrociclo(false)}>
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
              <label
                className="text-gray-700 font-medium mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                type="text"
                id="nombre"
                name="nombre"
                value={nombre || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                className="text-gray-700 font-medium mb-2"
                htmlFor="descripcion"
              >
                Descripción
              </label>
              <input
                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                type="text"
                id="descripcion"
                name="descripcion"
                value={descripcion || ""}
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
