import React, { useState } from "react";
import axios from "axios";
import axiosConfig from "../../config/axios-config";

export default function FormModal({
  setShowFormModal,
  formMode,
  ejercicioId,
  defaultEjercicioData,
  fetchEjercicios,
  meta,
}) {
  const [nombre, setNombre] = useState(defaultEjercicioData?.nombre);
  const [descripcion, setDescripcion] = useState(
    defaultEjercicioData?.descripcion
  );
  const [urlVideo, setUrlVideo] = useState(defaultEjercicioData?.url_video);
  const [urlFoto, setUrlFoto] = useState(defaultEjercicioData?.url_foto);
  const [tipo, setTipo] = useState(defaultEjercicioData?.tipo || "fuerza");
  const [grupoMuscular, setGrupoMuscular] = useState(
    defaultEjercicioData?.grupo_muscular || "pecho"
  );

  const refreshValues = () => {
    setNombre("");
    setDescripcion("");
    setUrlVideo("");
    setUrlFoto("");
    setTipo("fuerza");
    setGrupoMuscular("pecho");
  };

  /**
   * Create the exercise
   */
  const handleCreateEjercicio = () => {
    const ejercicioData = {
      nombre,
      descripcion,
      url_video: urlVideo,
      url_foto: urlFoto,
      tipo,
      grupo_muscular: grupoMuscular,
    };

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/v1/ejercicios`,
        ejercicioData,
        axiosConfig
      )
      .then((response) => {
        setShowFormModal(false);
        refreshValues();
        fetchEjercicios(
          `${import.meta.env.VITE_API_URL}/api/v1/ejercicios?page=${
            meta.current_page
          }`
        );
      })
      .catch((error) => {
        // Handle error
        console.error("Error creating exercise:", error);
      });
  };

  /**
   * Update the exercise
   */
  const handleUpdateEjercicio = () => {
    const ejercicioData = {
      nombre,
      descripcion,
      url_video: urlVideo,
      url_foto: urlFoto,
      tipo,
      grupo_muscular: grupoMuscular,
    };

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/v1/ejercicios/${ejercicioId}`,
        ejercicioData,
        axiosConfig
      )
      .then((response) => {
        setShowFormModal(false);
      })
      .finally(() => {
        fetchEjercicios(
          `${import.meta.env.VITE_API_URL}/api/v1/ejercicios?page=${
            meta.current_page
          }`
        );
      });
  };

  /**
   * Handle the form submission
   *
   * @param object e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the form is on create or edit mode
    if (formMode === "create") {
      // Create the exercise
      handleCreateEjercicio();
    } else {
      // Update the exercise
      handleUpdateEjercicio();
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
      case "urlVideo":
        setUrlVideo(value);
        break;
      case "urlFoto":
        setUrlFoto(value);
        break;
      case "tipo":
        setTipo(value);
        break;
      case "grupoMuscular":
        setGrupoMuscular(value);
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
              {formMode === "create" ? "Crear " : "Actualizar "} Ejercicio{" "}
            </h1>
            {/* close button */}
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
            <div className="flex flex-col mb-4">
              <label
                className="text-gray-700 font-medium mb-2"
                htmlFor="urlVideo"
              >
                URL del Video
              </label>
              <input
                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                type="text"
                id="urlVideo"
                name="urlVideo"
                value={urlVideo || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                className="text-gray-700 font-medium mb-2"
                htmlFor="urlFoto"
              >
                URL de la Imagen
              </label>
              <input
                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                type="text"
                id="urlFoto"
                name="urlFoto"
                value={urlFoto || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700 font-medium mb-2" htmlFor="tipo">
                Tipo de Ejercicio
              </label>
              <select
                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                id="tipo"
                name="tipo"
                value={tipo}
                onChange={handleChange}
              >
                <option value="fuerza">Fuerza</option>
                <option value="cardio">Cardio</option>
                <option value="movilidad">Movilidad</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {tipo === "fuerza" && (
              <div className="flex flex-col mb-4">
                <label
                  className="text-gray-700 font-medium mb-2"
                  htmlFor="grupoMuscular"
                >
                  Grupo Muscular
                </label>
                <select
                  className="bg-white rounded-lg p-2 border-2 border-gray-300"
                  id="grupoMuscular"
                  name="grupoMuscular"
                  value={grupoMuscular}
                  onChange={handleChange}
                >
                  <option value="pecho">Pecho</option>
                  <option value="espalda">Espalda</option>
                  <option value="pierna">Pierna</option>
                  <option value="hombro">Hombro</option>
                  <option value="biceps">Bíceps</option>
                  <option value="triceps">Tríceps</option>
                  <option value="core">Core</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            )}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
