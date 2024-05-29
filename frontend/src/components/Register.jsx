import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Register() {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [entrenadores, setEntrenadores] = useState([]);
  const [rol, setRol] = useState("atleta");
  const [apodo, setApodo] = useState("");
  const [informacion, setInformacion] = useState("");
  const [movil, setMovil] = useState("");
  const [selectedEntrenador, setSelectedEntrenador] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    obtenerEntrenadores();
  }, []);

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

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/register`,
        formData
      );
      const user_id = response.data.data.id;

      if (rol === "entrenador") {
        await createEntrenador(user_id);
      } else if (rol === "atleta") {
        await createAtleta(user_id);
      }

      setSuccessMessage("Registro realizado con éxito");
      setIsRegistered(true);
    } catch (err) {
      setError(err?.response?.data?.errors);
      setSuccessMessage(null);
    }
  };

  const createEntrenador = async (user_id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/entrenador/register`,
        {
          apodo,
          informacion,
          user_id,
        }
      );
    } catch (err) {
      console.error("Error al crear el entrenador:", err);
    }
  };

  const createAtleta = async (user_id) => {
    try {
      console.log("Entrenador seleccionado:", selectedEntrenador);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/atleta/register`,
        {
          apodo,
          informacion,
          movil,
          entrenador_id: selectedEntrenador,
          user_id,
        }
      );
    } catch (err) {
      console.error("Error al crear el atleta:", err);
    }
  };

  useEffect(() => {
    if (isRegistered) {
      window.location.href = "/login";
    }
  }, [isRegistered]);

  return (
    <form className="login100-form" method="POST" onSubmit={handleRegister}>
      <span className="login100-form-title p-b-49">Crea tu cuenta</span>

      <div className="input-container">
        <div className="wrap-input50 m-b-23">
          <span className="label-input100">Nombre</span>
          <input
            className="input100"
            type="first_name"
            name="first_name"
            id="first_name"
            placeholder="Nombre"
          />
          <span className="focus-input100"></span>
          <span className="text-red-500 text-sm">{error?.first_name}</span>
        </div>

        <div className="wrap-input50 m-b-23">
          <span className="label-input100">Apellidos</span>
          <input
            className="input100"
            type="last_name"
            name="last_name"
            id="last_name"
            placeholder="Apellidos"
          />
          <span className="focus-input100"></span>
          <span className="text-red-500 text-sm">{error?.last_name}</span>
        </div>
      </div>

      <div className="wrap-input100 m-b-23">
        <span className="label-input100">Correo</span>
        <input
          className="input100"
          type="email"
          name="email"
          id="email"
          placeholder="Correo electrónico"
        />
        <span className="focus-input100"></span>
        <span className="text-red-500 text-sm">{error?.email}</span>
      </div>

      <div className="wrap-input100 m-b-23">
        <span className="label-input100">Contraseña</span>
        <input
          className="input100"
          type="password"
          name="password"
          id="password"
          placeholder="Ingrese su contraseña"
        />
        <span className="focus-input100"></span>
        <span className="text-red-500 text-sm">{error?.password}</span>
      </div>

      <div className="wrap-input100" style={{ marginBottom: "20px" }}>
        <span className="label-input100">Rol</span>
        <select
          className="input100"
          name="rol"
          id="rol"
          onChange={(e) => setRol(e.target.value)}
        >
          <option value="atleta" selected>
            Atleta
          </option>
          <option value="entrenador">Entrenador</option>
        </select>
        <span className="focus-input100"></span>
      </div>

      {rol === "entrenador" && (
        <div className="wrap-input100 m-b-23">
          <span className="label-input100">Apodo</span>
          <input
            className="input100"
            type="text"
            name="apodo"
            id="apodo"
            placeholder="Apodo"
            onChange={(e) => setApodo(e.target.value)}
          />
          <span className="focus-input100"></span>
          <span className="text-red-500 text-sm">{error?.apodo}</span>
        </div>
      )}

      {rol === "entrenador" && (
        <div className="wrap-input100 m-b-23">
          <span className="label-input100">Información</span>
          <textarea
            className="input100"
            name="informacion"
            id="informacion"
            placeholder="Información (opcional)"
            onChange={(e) => setInformacion(e.target.value)}
            style={{ marginTop: "15px" }}
          ></textarea>
          <span className="focus-input100"></span>
          <span className="text-red-500 text-sm">{error?.informacion}</span>
        </div>
      )}

      {rol === "atleta" && (
        <div className="input-container">
          <div className="wrap-input50 m-b-23">
            <span className="label-input100">Apodo</span>
            <input
              className="input100"
              type="text"
              name="apodo"
              id="apodo"
              placeholder="Apodo"
              onChange={(e) => setApodo(e.target.value)}
            />
            <span className="focus-input100"></span>
            <span className="text-red-500 text-sm">{error?.apodo}</span>
          </div>

          <div className="wrap-input50 m-b-23">
            <span className="label-input100">Teléfono Móvil</span>
            <input
              className="input100"
              type="text"
              name="movil"
              id="movil"
              placeholder="Teléfono (opcional)"
              value={movil}
              onChange={(e) => setMovil(e.target.value)}
            />
            <span className="focus-input100"></span>
            <span className="text-red-500 text-sm">{error?.telefono}</span>
          </div>
        </div>
      )}

      {rol === "atleta" && (
        <div className="input-container">
          {/* Primera parte de la segunda fila */}
          <div className="wrap-input50 m-b-23">
            <span className="label-input100">Entrenador</span>
            <select
              className="input100"
              name="entrenador"
              id="entrenador"
              value={selectedEntrenador}
              onChange={(e) => setSelectedEntrenador(e.target.value)}
            >
              <option value="">Sin entrenador</option>
              {entrenadores.map((entrenador) => (
                <option key={entrenador.id} value={entrenador.id}>
                  {`${entrenador.apodo}`}
                </option>
              ))}
            </select>
            <span className="focus-input100"></span>
          </div>

          {/* Segunda parte de la segunda fila */}
          <div className="wrap-input50 m-b-23">
            <span className="label-input100">Información</span>
            <textarea
              className="input100"
              name="informacion"
              id="informacion"
              placeholder="Información (opcional)"
              onChange={(e) => setInformacion(e.target.value)}
              style={{ marginTop: "15px" }}
            ></textarea>
            <span className="focus-input100"></span>
            <span className="text-red-500 text-sm">{error?.informacion}</span>
          </div>
        </div>
      )}

      <div className="text-right p-t-8 p-b-31"></div>

      <div className="container-login100-form-btn">
        <div className="wrap-login100-form-btn">
          <div className="login100-form-bgbtn"></div>
          <button className="login100-form-btn" type="submit">
            Regístrate
          </button>
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
        </div>
      </div>

      <div className="flex-col-c p-t-60">
        <span className="txt1 p-b-17">¿Ya tienes cuenta?</span>

        <a onClick={() => (window.location.href = "/login")} className="txt2">
          Ir a Login
        </a>
      </div>
    </form>
  );
}
