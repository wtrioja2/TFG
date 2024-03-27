import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function ExerciseForm({ exerciseToEdit }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showMuscleSelect, setShowMuscleSelect] = useState(true);

  // Estado para almacenar los datos del ejercicio a modificar
  const [exerciseData, setExerciseData] = useState({
    nombre: "",
    url_foto: "",
    url_video: "",
    descripcion: "",
    tipo: "fuerza", // Valor predeterminado para tipo
    grupo_muscular: "pecho", // Valor predeterminado para grupo muscular
  });

  // Si se proporciona un ejercicio para editar, establecer los datos del ejercicio en el estado inicial
  useEffect(() => {
    if (exerciseToEdit) {
      setExerciseData({
        nombre: exerciseToEdit.nombre || "",
        url_foto: exerciseToEdit.url_foto || "",
        url_video: exerciseToEdit.url_video || "",
        descripcion: exerciseToEdit.descripcion || "",
        tipo: exerciseToEdit.tipo || "fuerza",
        grupo_muscular: exerciseToEdit.grupo_muscular || "pecho",
      });
    }
  }, [exerciseToEdit]);

  const handleExerciseSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nombre: e.target.nombre.value,
      url_foto: e.target.url_foto.value,
      url_video: e.target.url_video.value,
      descripcion: e.target.descripcion.value,
      tipo: e.target.tipo.value,
      grupo_muscular: e.target.grupo_muscular.value,
    };

    try {
      // Determinar si es una creación o una modificación
      if (exerciseToEdit) {
        // Modificar el ejercicio existente
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/v1/ejercicios/${
            exerciseToEdit.id
          }`,
          formData
        );
        setSuccessMessage("Ejercicio modificado exitosamente.");
      } else {
        // Crear un nuevo ejercicio
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/ejercicios`,
          formData
        );
        setSuccessMessage("Ejercicio creado exitosamente.");
      }
      setError(null);
      e.target.reset();
    } catch (err) {
      setError(err.response.data.errors);
      setSuccessMessage(null);
    }
  };

  const handleTypeChange = (event) => {
    const tipo = event.target.value;
    setShowMuscleSelect(tipo === "fuerza");
  };

  return (
    <form
      onSubmit={handleExerciseSubmit}
      className="login100-form create-ejercicio-form"
    >
      <div className="wrap-input100 m-b-15">
        <span className="label-input100">Nombre</span>
        <input
          className="input100"
          type="text"
          name="nombre"
          defaultValue={exerciseData.nombre}
          placeholder="Nombre del ejercicio"
        />
        <span className="focus-input100"></span>
        <span className="text-red-500 text-sm">{error?.nombre}</span>
      </div>

      <div className="wrap-input100 m-b-15">
        <span className="label-input100">URL de la foto</span>
        <input
          className="input100"
          type="text"
          name="url_foto"
          defaultValue={exerciseData.url_foto}
          placeholder="URL de la foto del ejercicio"
        />
        <span className="focus-input100"></span>
        <span className="text-red-500 text-sm">{error?.url_foto}</span>
      </div>

      <div className="wrap-input100 m-b-15">
        <span className="label-input100">URL del video</span>
        <input
          className="input100"
          type="text"
          name="url_video"
          defaultValue={exerciseData.url_video}
          placeholder="URL del video del ejercicio"
        />
        <span className="focus-input100"></span>
        <span className="text-red-500 text-sm">{error?.url_video}</span>
      </div>

      <div className="wrap-input100 m-b-15">
        <span className="label-input100">Descripción</span>
        <textarea
          className="input100"
          name="descripcion"
          defaultValue={exerciseData.descripcion}
          placeholder="Descripción del ejercicio"
        ></textarea>
        <span className="focus-input100"></span>
        <span className="text-red-500 text-sm">{error?.descripcion}</span>
      </div>

      <div
        className="wrap-input100 m-b-15"
        name="tipo"
        onChange={handleTypeChange}
      >
        <span className="label-input100">Tipo</span>
        <select
          className="input100"
          name="tipo"
          defaultValue={exerciseData.tipo}
        >
          <option value="fuerza">Fuerza</option>
          <option value="cardio">Cardio</option>
          <option value="movilidad">Movilidad</option>
          <option value="otro">Otro</option>
        </select>
        <span className="focus-input100"></span>
        <span className="text-red-500 text-sm">{error?.tipo}</span>
      </div>

      {showMuscleSelect && (
        <div className="wrap-input100">
          <span className="label-input100">Grupo Muscular</span>
          <select
            className="input100"
            name="grupo_muscular"
            defaultValue={exerciseData.grupo_muscular}
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
          <span className="focus-input100"></span>
          <span className="text-red-500 text-sm">{error?.grupo_muscular}</span>
        </div>
      )}

      <div className="container-login100-form-btn">
        <div className="wrap-login100-form-btn">
          <div className="login100-form-bgbtn"></div>
          <button className="login100-form-btn" type="submit">
            {exerciseToEdit ? "Modificar Ejercicio" : "Crear Ejercicio"}
          </button>
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
}
