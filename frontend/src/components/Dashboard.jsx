import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import NumberPicker from "./NumberPicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faVideo } from "@fortawesome/free-solid-svg-icons";

export default function Index() {
  const [sesiones, setSesiones] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);
  const [sesionActualIndex, setSesionActualIndex] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sesionesResponse, ejerciciosResponse] = await Promise.all([
          axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/api/v1/sesiones/sesiones-con-lineas`
          ),
          axios.get(`${import.meta.env.VITE_API_URL}/api/v1/ejercicios`),
        ]);

        setSesiones(sesionesResponse.data.data);
        setEjercicios(ejerciciosResponse.data.data);
      } catch (error) {
        console.error("Error al obtener las sesiones: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fechaHoy = new Date().toISOString().split("T")[0];

    const sesionHoy = sesiones.find((sesion) => sesion.fecha === fechaHoy);
    if (sesionHoy) {
      setSesionActualIndex(sesiones.indexOf(sesionHoy));
    } else {
      const sesionesFuturas = sesiones.filter(
        (sesion) => sesion.fecha > fechaHoy
      );
      if (sesionesFuturas.length > 0) {
        // Ordena las sesiones futuras por fecha.
        const sesionesOrdenadas = sesionesFuturas.sort(
          (a, b) => new Date(a.fecha) - new Date(b.fecha)
        );
        setSesionActualIndex(sesiones.indexOf(sesionesOrdenadas[0]));
      } else {
        setSesionActualIndex(-1); // No hay sesiones futuras
      }
    }
  }, [sesiones]);

  const cambiarSesion = (indice) => {
    setSesionActualIndex(indice);
  };

  const sesionActual =
    sesionActualIndex !== -1 ? sesiones[sesionActualIndex] : null;

  const sesionAnterior =
    sesionActualIndex > 0 ? sesiones[sesionActualIndex - 1] : null;
  const sesionSiguiente =
    sesionActualIndex < sesiones.length - 1
      ? sesiones[sesionActualIndex + 1]
      : null;

  // Función para obtener la URL de la imagen del ejercicio
  const abrirFotoEjercicio = (ejercicioId) => {
    const ejercicio = ejercicios.find((e) => e.id === ejercicioId);
    if (ejercicio && ejercicio.url_foto) {
      const width = 800; // Ancho en píxeles
      const height = 600; // Alto en píxeles

      // Calcula la posición del centro de la pantalla para centrar la ventana
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;

      window.open(
        ejercicio.url_foto,
        "_blank",
        `width=${width},height=${height},left=${left},top=${top}`
      );
    }
  };

  const abrirVideoEjercicio = (ejercicioId) => {
    const ejercicio = ejercicios.find((e) => e.id === ejercicioId);
    if (ejercicio && ejercicio.url_video) {
      const width = 800; // Ancho en píxeles
      const height = 600; // Alto en píxeles

      // Calcula la posición del centro de la pantalla para centrar la ventana
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;
      window.open(
        ejercicio.url_video,
        "_blank",
        `width=${width},height=${height},left=${left},top=${top}`
      );
    }
  };

  // Función para obtener el nombre del ejercicio
  const obtenerNombreEjercicio = (ejercicioId) => {
    const ejercicio = ejercicios.find((e) => e.id === ejercicioId);
    return ejercicio ? ejercicio.nombre : "Ejercicio Desconocido";
  };

  // Componente LineaSesionCard
  const LineaSesionCard = ({ linea }) => {
    const [series, setSeries] = useState(linea.series);
    const [repeticiones, setRepeticiones] = useState(linea.repeticiones);
    const [kilos, setKilos] = useState(parseFloat(linea.kilos));

    const handleKilosChange = (newValue) => {
      const parsedKilos = parseFloat(newValue.toFixed(2));
      setKilos(parsedKilos);
    };

    return (
      <div className="card card-border">
        <div className="container">
          <div
            className="container-head"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4 style={{ margin: "0 10px 0 0" }}>
              <b>{obtenerNombreEjercicio(linea.ejercicio_id)}</b>
            </h4>
            <div>
              <FontAwesomeIcon
                icon={faCamera}
                size="lg"
                onClick={() => abrirFotoEjercicio(linea.ejercicio_id)}
                style={{ cursor: "pointer", marginRight: "10px" }}
              />
              <FontAwesomeIcon
                icon={faVideo}
                size="lg"
                onClick={() => abrirVideoEjercicio(linea.ejercicio_id)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          <div className="number-picker-container">
            <label>Series:</label>
            <NumberPicker value={series} onChange={setSeries} />
          </div>

          <div className="number-picker-container">
            <label>Repeticiones:</label>
            <NumberPicker value={repeticiones} onChange={setRepeticiones} />
          </div>

          <div className="number-picker-container">
            <label>Kilos: </label>
            <input
              type="range"
              min="0"
              max="200"
              step="0.25"
              value={kilos}
              onChange={(e) => handleKilosChange(parseFloat(e.target.value))}
            />{" "}
            <input
              type="number"
              min="0"
              step="0.25"
              value={kilos}
              onChange={(e) => handleKilosChange(parseFloat(e.target.value))}
              style={{ width: "60px" }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 border border-gray-400 text-center"
          onClick={() => cambiarSesion(sesionActualIndex - 1)}
          disabled={sesionAnterior === null}
        >
          Sesión Anterior
        </button>
        <button
          className="px-4 py-2 border border-gray-400 text-center"
          onClick={() => cambiarSesion(sesionActualIndex + 1)}
          disabled={sesionSiguiente === null}
        >
          Sesión Siguiente
        </button>
      </div>
      {sesionActual ? (
        <div className="w-full text-2xl text-gray-800 font-bold leading-tight text-center">
          <p>{sesionActual.fecha}</p>
          <p>{sesionActual.nombre}</p>
          {/* Agrega más información sobre la sesión si es necesario */}
        </div>
      ) : (
        <p>No hay sesión programada para hoy ni en el futuro cercano.</p>
      )}

      <div className="mt-4">
        {sesionActual && sesionActual.lineas_sesion ? (
          <div className="card-container">
            {sesionActual.lineas_sesion.map((linea, index) => (
              <LineaSesionCard key={index} linea={linea} />
            ))}
          </div>
        ) : (
          <p>No hay líneas de sesión disponibles.</p>
        )}
      </div>
    </div>
  );
}
