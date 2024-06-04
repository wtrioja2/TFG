import { useState, useEffect } from "react";
import axios from "axios";
import axiosConfig from "../../config/axios-config";
import "react-datepicker/dist/react-datepicker.css";
import DeleteModal from "./DeleteModal";
import MyDatePicker from "../MyDatePicker";
import { format } from "date-fns";
import Counter from "../Counter";
import EntrenadorAtletaSelector from "../EntrenadorAtletaSelector";
import {Grid, Typography, FormControl, Select, MenuItem,} from "@mui/material";

export default function Index({ user }) {
  const [lineas, setLineas] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);
  const [rms, setRms] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSesion, setSelectedSesion] = useState("");
  const [totalEjercicios, setTotalEjercicios] = useState(null);
  const [totalRepeticiones, setTotalRepeticiones] = useState(null);
  const [volAbsoluto, setVolAbsoluto] = useState(null);
  const [volRelativo, setVolRelativo] = useState(null);
  const [editarFila, setEditarFila] = useState(null);
  const [editarCampo, setEditarCampo] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [lineaId, setLineaId] = useState(null);

  const [selectedEntrenador, setSelectedEntrenador] = useState("");
  const [selectedAtleta, setSelectedAtleta] = useState(
    localStorage.getItem("atleta_id") || ""
  );

  const handleEntrenadorChange = (entrenadorId) => {
    setSelectedEntrenador(entrenadorId);
  };

  const handleAtletaChange = (atletaId) => {
    setSelectedAtleta(atletaId);
    setSelectedSesion("");
  };

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    const formattedDate = format(date, "yyyy-MM-dd");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/sesiones/${formattedDate}`,
        axiosConfig
      );

      if (response.data && response.data.id) {
        const sesion = response.data;
        setSelectedSesion(sesion);

        await calcularTotales(formattedDate);
      } else {
        resetTotals();
      }
    } catch (error) {
      console.error("No hay sesión en la fecha seleccionada: ", error);
      setSelectedSesion("");
      resetTotals();
    }
  };

  const calcularTotales = async (fecha) => {
    try {
      const totalesResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/sesiones/total?fecha=${fecha}`,
        axiosConfig
      );

      const {
        total_ejercicios,
        total_repeticiones,
        volumen_absoluto,
        volumen_relativo,
      } = totalesResponse.data;

      setTotalEjercicios(total_ejercicios);
      setTotalRepeticiones(total_repeticiones);
      setVolAbsoluto(volumen_absoluto);
      setVolRelativo(volumen_relativo);
    } catch (error) {
      console.error("Error al calcular los totales: ", error);
    }
  };

  const resetTotals = () => {0
    setTotalEjercicios(0);
    setTotalRepeticiones(0);
    setVolAbsoluto(0);
    setVolRelativo(0);
  };

  const fetchLineas = async () => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    if (selectedAtleta && selectedDate) {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/lineassesion/indexById?atleta_id=${selectedAtleta}&fecha=${formattedDate}`,
          axiosConfig
        );
        console.log("Líneas: ", response.data.data);
        setLineas(response.data.data);
      } catch (error) {
        console.error("Error fetching lineas: ", error);
      }
    }
  };

  const fetchEjercicios = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/ejercicios/todos`,
        axiosConfig
      );
      console.log("Ejercicios: ", response.data);
      setEjercicios(response.data);
    } catch (error) {
      console.error("Error fetching ejercicios: ", error);
    }
  };

  const fetchRms = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/rm/indexById?atleta_id=${selectedAtleta}`,
        axiosConfig
      );
      const rmsData = response.data;

      // Filtra y selecciona las RM más recientes por ejercicio_id
      const ultimaRms = rmsData.reduce((acc, rm) => {
        if (!acc[rm.ejercicio_id] || rm.fecha > acc[rm.ejercicio_id].fecha) {
          acc[rm.ejercicio_id] = rm;
        }
        return acc;
      }, {});
      console.log("Últimas RMs:", ultimaRms);
      setRms(ultimaRms);
    } catch (error) {
      console.error("Error fetching RMs: ", error);
    }
  };

  const deleteLinea = (lineaId) => {
    setShowDeleteModal(true);
    setLineaId(lineaId);
  };

  const insertaLineaEnBD = async (nuevaLinea) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/lineassesion`,
        nuevaLinea,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erro al insertar la nueva línea en la base de datos",
        error
      );
      throw error;
    }
  };

  const actualizaFila = async (filaIndex, campo, valor) => {
    try {
      const id = lineas[filaIndex].id;

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/lineassesion/${id}`,
        { [campo]: valor },
        axiosConfig
      );

      setEditarFila(null);
      setEditarCampo(null);

      await calcularTotales(format(selectedDate, "yyyy-MM-dd"));
    } catch (e) {
      console.error("Error al actualizar la fila: ", e);
    }
  };

  useEffect(() => {
    fetchEjercicios();
  }, []);

  useEffect(() => {
    if (selectedAtleta && selectedDate) { 
      fetchLineas();
    }
  }, [selectedDate, selectedAtleta]);

  useEffect(() => {
    if (selectedAtleta) {
      fetchRms();
    }
  }, [selectedAtleta]);

  return (
    <div className="mt-10">
      <div className="flex justify-between mb-3">
        <div>
          <EntrenadorAtletaSelector
            user={user}
            onEntrenadorChange={handleEntrenadorChange}
            onAtletaChange={handleAtletaChange}
          />
        </div>
        <div>
          <MyDatePicker
            onDateChange={(date) => {
              fetchLineas(date);
              handleDateChange(date);
            }}
          />
        </div>
      </div>

      {totalEjercicios !== null && (
        <Grid container justifyContent="center" spacing={3} mb={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center" fontWeight="bold">
              Total ejercicios: {totalEjercicios}
            </Typography>
            <Typography variant="h5" align="center" fontWeight="bold">
              Total repeticiones: {totalRepeticiones}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center" fontWeight="bold">
              Volumen Absoluto: {volAbsoluto.toFixed(2)}
            </Typography>
            <Typography variant="h5" align="center" fontWeight="bold">
              Volumen Relativo: {volRelativo.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      )}
      <h1 className="w-full text-2xl text-gray-800 font-bold leading-tight text-center">
        {selectedSesion.nombre}
      </h1>
      <button
        onClick={async () => {
          try {
            await insertaLineaEnBD({
              fecha: selectedDate.toISOString().split("T")[0],
              series: 3,
              repeticiones: 10,
              kilos: 50,
              comentario: "",
              atleta_id: selectedAtleta,
              ejercicio_id: 1,
              sesion_id: selectedSesion.id,
            });
            await fetchLineas(); // Recargar las líneas después de insertar
            await calcularTotales(format(selectedDate, "yyyy-MM-dd"));
          } catch (error) {
            console.error(
              "Error al insertar la línea en la base de datos: ",
              error
            );
          }
        }}
        className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full mb-5 float:right"
      >
        Añadir Ejercicio
      </button>

      <table id="tabla" className="table-auto w-full border">
        <thead>
          <tr className="text-left font-medium">
            <th className="px-4 py-2 border border-gray-400 text-center align-middle">
              Ejercicio
            </th>
            <th className="px-4 py-2 border border-gray-400 text-center align-middle">
              RM
            </th>
            <th className="px-4 py-2 border border-gray-400 text-center align-middle">
              Series
            </th>
            <th className="px-4 py-2 border border-gray-400 text-center align-middle">
              Repeticiones
            </th>
            <th className="px-4 py-2 border border-gray-400 text-center align-middle">
              Kilos
            </th>
            <th className="px-4 py-2 border border-gray-400 text-center align-middle">
              %RM
            </th>
            <th className="px-4 py-2 border border-gray-400 text-center align-middle">
              Rep. totales
            </th>
            <th className="px-4 py-2 border border-gray-400 text-center align-middle">
              Vol. absoluto
            </th>
            <th className="px-4 py-2 border border-gray-400 text-center align-middle">
              Comentario
            </th>
            <th className="px-4 py-2 border border-gray-400 text-center align-middle">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {lineas && lineas.length > 0 ? (
            lineas.map((linea, key) => (
              <tr key={key} className="text-left">
                <td className="px-4 py-2 border border-gray-400 text-center align-middle">
                  <FormControl fullWidth>
                    <Select
                      labelId={`ejercicio-label-${key}`}
                      id={`ejercicio-select-${key}`}
                      value={linea.ejercicio_id}
                      onChange={(e) => {
                        const selectedEjercicioId = e.target.value;
                        const updatedLineas = lineas.map((lineaItem) => {
                          if (lineaItem.id === linea.id) {
                            return {
                              ...lineaItem,
                              ejercicio_id: selectedEjercicioId,
                            };
                          }
                          return lineaItem;
                        });
                        setLineas(updatedLineas);
                        actualizaFila(key, "ejercicio_id", selectedEjercicioId);
                      }}
                    >
                      {ejercicios.map((ejercicio) => (
                        <MenuItem key={ejercicio.id} value={ejercicio.id}>
                          {ejercicio.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </td>
                <td className="px-4 py-2 border border-gray-400 text-center align-middle">
                  {rms[linea.ejercicio_id]?.rm || ""}
                </td>
                <td className="px-4 py-2 border border-gray-400 text-center align-middle">
                  <Counter
                    value={linea.series}
                    onIncrement={() => {
                      const updatedLineas = [...lineas];
                      updatedLineas[key].series += 1;
                      setLineas(updatedLineas);
                      actualizaFila(key, "series", updatedLineas[key].series);
                    }}
                    onDecrement={() => {
                      const updatedLineas = [...lineas];
                      if (updatedLineas[key].series > 0) {
                        updatedLineas[key].series -= 1;
                        setLineas(updatedLineas);
                        actualizaFila(key, "series", updatedLineas[key].series);
                      }
                    }}
                    onUpdate={(newValue) => {
                      const updatedLineas = [...lineas];
                      updatedLineas[key].series = newValue;
                      setLineas(updatedLineas);
                      actualizaFila(key, "series", newValue);
                    }}
                  />
                </td>
                <td className="px-4 py-2 border border-gray-400 text-center align-middle">
                  <Counter
                    value={linea.repeticiones}
                    onIncrement={() => {
                      const updatedLineas = [...lineas];
                      updatedLineas[key].repeticiones += 1;
                      setLineas(updatedLineas);
                      actualizaFila(
                        key,
                        "repeticiones",
                        updatedLineas[key].repeticiones
                      );
                    }}
                    onDecrement={() => {
                      const updatedLineas = [...lineas];
                      if (updatedLineas[key].repeticiones > 0) {
                        updatedLineas[key].repeticiones -= 1;
                        setLineas(updatedLineas);
                        actualizaFila(
                          key,
                          "repeticiones",
                          updatedLineas[key].repeticiones
                        );
                      }
                    }}
                    onUpdate={(newValue) => {
                      const updatedLineas = [...lineas];
                      updatedLineas[key].repeticiones = newValue;
                      setLineas(updatedLineas);
                      actualizaFila(key, "repeticiones", newValue);
                    }}
                  />
                </td>
                <td className="px-4 py-2 border border-gray-400 text-center align-middle">
                  <Counter
                    value={linea.kilos}
                    onIncrement={() => {
                      const updatedLineas = [...lineas];
                      let currentKilos = isNaN(linea.kilos)
                        ? 0
                        : parseFloat(linea.kilos);
                      updatedLineas[key].kilos = parseFloat(
                        (currentKilos + 1).toFixed(2)
                      );
                      setLineas(updatedLineas);
                      actualizaFila(
                        key,
                        "kilos",
                        updatedLineas[key].kilos.toFixed(2)
                      );
                    }}
                    onDecrement={() => {
                      const updatedLineas = [...lineas];
                      updatedLineas[key].kilos = parseFloat(
                        (linea.kilos - 1).toFixed(2)
                      );
                      if (updatedLineas[key].kilos < 0) {
                        updatedLineas[key].kilos = 0;
                      }
                      setLineas(updatedLineas);
                      actualizaFila(
                        key,
                        "kilos",
                        updatedLineas[key].kilos.toFixed(2)
                      );
                    }}
                    onUpdate={(newValue) => {
                      const updatedLineas = [...lineas];
                      updatedLineas[key].kilos = parseFloat(newValue);
                      setLineas(updatedLineas);
                      actualizaFila(
                        key,
                        "kilos",
                        parseFloat(newValue).toFixed(2)
                      );
                    }}
                    isKilos={true}
                  />
                </td>
                <td className="px-4 py-2 border border-gray-400 text-center align-middle">
                  {isNaN(rms[linea.ejercicio_id]?.rm)
                    ? ""
                    : (linea.kilos / rms[linea.ejercicio_id]?.rm).toFixed(2)}
                </td>
                <td className="px-4 py-2 border border-gray-400 text-center align-middle">
                  {!isNaN(linea.series) && !isNaN(linea.repeticiones)
                    ? linea.series * linea.repeticiones
                    : ""}
                </td>
                <td className="px-4 py-2 border border-gray-400 text-center align-middle">
                  {!isNaN(linea.series) &&
                  !isNaN(linea.repeticiones) &&
                  !isNaN(linea.kilos)
                    ? linea.series * linea.repeticiones * linea.kilos
                    : ""}
                </td>
                <td className="px-4 py-2 border border-gray-400 text-center align-middle">
                  {linea.comentario}
                </td>
                <td className="px-4 py-2 border border-gray-400 text-center align-middle">
                  <button
                    onClick={() => deleteLinea(linea.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full mr-2"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">
                No hay líneas disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          lineaId={lineaId}
          fetchLineas={fetchLineas}
          calcularTotales={calcularTotales}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}
