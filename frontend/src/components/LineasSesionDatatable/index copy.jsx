import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import axiosConfig from "../../config/axios-config";
import DeleteModal from "./DeleteModal";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

export default function index() {
  const [lineas, setLineas] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);
  const [rms, setRms] = useState([]);
  const [links, setLinks] = useState([]);
  const [meta, setMeta] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editarFila, setEditarFila] = useState(null);
  const [editarCampo, setEditarCampo] = useState(null);
  const [lineaId, setLineaId] = useState(null);
  const [totalEjercicios, setTotalEjercicios] = useState(null);
  const [totalRepeticiones, setTotalRepeticiones] = useState(null);
  const [volAbsoluto, setVolAbsoluto] = useState(null);
  const [volRelativo, setVolRelativo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const datepickerRef = useRef(null);
  const [selectedSesion, setSelectedSesion] = useState("");

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    const formattedDate = format(date, "yyyy-MM-dd");
    console.log(formattedDate);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/sesiones/${formattedDate}`
      );

      if (response.data && response.data.nombre) {
        const nombreSesion = response.data.nombre;
        console.log(nombreSesion);
        setSelectedSesion(nombreSesion);

        const totalesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/sesiones/total?fecha=${formattedDate}`);
        console.log(totalesResponse);
        const totalEjercicios = totalesResponse.data.total_ejercicios;
        const totalRepeticiones = totalesResponse.data.total_repeticiones;
        const volAbsoluto = totalesResponse.data.volumen_absoluto;
        const volRelativo = totalesResponse.data.volumen_relativo;
        
        setTotalEjercicios(totalEjercicios);
        setTotalRepeticiones(totalRepeticiones);
        setVolAbsoluto(volAbsoluto);
        setVolRelativo(volRelativo);

      } else {

        setTotalEjercicios(0);
        setTotalRepeticiones(0);
        setVolAbsoluto(0);
        setVolRelativo(0);

      }
    } catch (error) {
      console.error("No hay sesión en la fecha seleccionada: ", error);
      setSelectedSesion("");
      setTotalEjercicios(0);
      setTotalRepeticiones(0);
      setVolAbsoluto(0);
      setVolRelativo(0);
    }
  };

  /**
   * Set the paginated data
   *
   * @param object response
   */
  const setPaginatedData = (response) => {
    setLineas(response.data.data);
    setLinks(response.data.links);
    setMeta(response.data.meta);
  };

  /**
   * Fetch all lineas
   */
  const fetchLineas = async (link) => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const url = `${
      import.meta.env.VITE_API_URL
    }/api/v1/lineassesion?fecha=${formattedDate}`;
    try {
      const response = await axios.get(url, axiosConfig);
      setPaginatedData(response);
    } catch (error) {
      console.error("Error fetching lineas: ", error);
    }
  };

  const previousPage = async () => {
    await fetchLineas(links.prev);
  };

  const nextPage = async () => {
    await fetchLineas(links.next);
  };

  const firstPage = async () => {
    await fetchLineas(links.first);
  };

  const lastPage = async () => {
    await fetchLineas(links.last);
  };

  /**
   * Delete de linea
   *
   * @param int lineaId
   */
  const deleteLinea = (lineaId) => {
    setShowDeleteModal(true);
    setLineaId(lineaId);
  };

  const getMaxLineaId = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/lineassesion/maxid`
      );
      const maxId = response.data.maxId;
      return maxId;
    } catch (error) {
      console.error("Error fetching max Id: ", error);
      return null;
    }
  };

  const insertaLineaEnBD = async (nuevaLinea) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/lineassesion`,
        nuevaLinea
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

  const insertaLinea = async () => {
    const fechaActual = new Date().toISOString().split("T")[0];
    try {
      const maxId = await getMaxLineaId();
      const nuevaLinea = {
        id: maxId + 1,
        fecha: fechaActual,
        series: 3,
        repeticiones: 10,
        kilos: 50,
        comentario: "...",
        atleta_id: 1,
        ejercicio_id: 1,
        tipo_actividad_id: 1,
        sesion_id: 1,
      };

      await insertaLineaEnBD(nuevaLinea);
      const updatedLineas = [...lineas, nuevaLinea];
      setLineas(updatedLineas);
    } catch (error) {
      console.error("Error al obtener el ID máximo: ", error);
    }
  };

  useEffect(() => {
    //fetchLineas(`${import.meta.env.VITE_API_URL}/api/v1/lineassesion?fecha=${format(selectedDate, 'yyyy-MM-dd')}`);
    fetchLineas();

    const fetchData = async () => {
      try {
        const [ejerciciosResponse, rmsResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/v1/ejercicios`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/v1/rm`),
        ]);

        setEjercicios(ejerciciosResponse.data.data);

        // Filta los RM más recientes por ejercicio_id
        const ultimaRms = rmsResponse.data.data.reduce((acc, rm) => {
          if (!acc[rm.ejercicio_id] || rm.fecha > acc[rm.ejercicio_id].fecha) {
            acc[rm.ejercicio_id] = rm;
          }
          return acc;
        }, {});
        setRms(ultimaRms);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();

  }, [selectedDate]); // Agregamos selectedDate como dependencia

  const actualizaFila = async (filaIndex, campo) => {
    try {
      const id = lineas[filaIndex].id;
      const valor = lineas[filaIndex][campo];

      console.log(`ID: ${id}, Campo: ${campo}, Valor: ${valor}`);

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/lineassesion/${id}`,
        { [campo]: valor }
      );
      setEditarFila(null);
      setEditarCampo(null);
    } catch (e) {
      console.error("Error al actualizar la fila: ", e);
    }
  };

  return (
    <div className="mt-10">
      <h1 className="w-full text-2xl text-gray-800 font-bold leading-tight text-center">
        {selectedSesion}
      </h1>
      <div className="flex justify-between mb-3">
        <div className="relative">
          <FontAwesomeIcon
            icon={faCalendar}
            size="lg"
            onClick={() => datepickerRef.current.setOpen(true)}
            style={{ cursor: "pointer" }}
          />
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            setSelectedDate={setSelectedDate}
            className="form-control pl-10 pr-3"
            ref={datepickerRef}
          />
        </div>
        <button
          onClick={insertaLinea}
          className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full mb-5"
        >
          Añadir Ejercicio
        </button>
      </div>
      {totalEjercicios !== null && (
        <div className="text-center mb-3">
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
          <div>
            <h2 className="w-full text-xl text-gray-800 font-bold leading-tight text-center">Total ejercicios: {totalEjercicios}</h2>
            <h2 className="w-full text-xl text-gray-800 font-bold leading-tight text-center">Total repeticiones: {totalRepeticiones}</h2>
          </div>
          <div>
            <h2 className="w-full text-xl text-gray-800 font-bold leading-tight text-center">Volumen Absoluto: {volAbsoluto}</h2>
            <h2 className="w-full text-xl text-gray-800 font-bold leading-tight text-center">Volumen Relativo: {volRelativo}</h2>
          </div> 
          </div>
        </div>
      )}
      <table id="tabla" className="table-auto w-full border">
        <thead>
          <tr className="text-left font-medium">
            <th className="px-4 py-2 border border-gray-400 text-center align-middle">
              Fecha
            </th>
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
              % 1RM
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
          {lineas.map((linea, key) => (
            <tr key={key} className="text-left">
              <td className="px-4 py-2 border border-gray-400 text-center align-middle">
                {linea.fecha}
              </td>
              <td className="px-4 py-2 border border-gray-400 text-center align-middle">
                <select
                  value={linea.ejercicio_id}
                  onChange={(e) => {
                    const nuevoEjercicioId = parseInt(e.target.value);
                    const updatedLineas = [...lineas];
                    updatedLineas[key].ejercicio_id = parseInt(e.target.value);
                    setLineas(updatedLineas);

                    actualizaFila(key, "ejercicio_id", nuevoEjercicioId);
                  }}
                >
                  {ejercicios.map((ejercicio) => (
                    <option key={ejercicio.id} value={ejercicio.id}>
                      {ejercicio.nombre}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-2 border border-gray-400 text-center align-middle">
                {rms[linea.ejercicio_id]?.rm || ""}
              </td>
              <td className="px-4 py-2 border border-gray-400 text-center align-middle">
                {editarFila === key && editarCampo === "series" ? (
                  <input
                    id="series"
                    type="number"
                    value={linea.series}
                    onChange={(e) => {
                      const updatedLineas = [...lineas];
                      updatedLineas[key].series = parseInt(e.target.value);
                      setLineas(updatedLineas);
                    }}
                    onBlur={() => actualizaFila(key, "series")}
                    className="w-[100px] px-2 py-1 border rounded"
                  />
                ) : (
                  <span
                    onClick={() => {
                      setEditarFila(key);
                      setEditarCampo("series");
                    }}
                  >
                    {linea.series}
                  </span>
                )}
              </td>
              <td className="px-4 py-2 border border-gray-400 text-center align-middle">
                {editarFila === key && editarCampo === "repeticiones" ? (
                  <input
                    id="repeticiones"
                    type="number"
                    value={linea.repeticiones}
                    onChange={(e) => {
                      const updatedLineas = [...lineas];
                      updatedLineas[key].repeticiones = parseInt(
                        e.target.value
                      );
                      setLineas(updatedLineas);
                    }}
                    onBlur={() => actualizaFila(key, "repeticiones")}
                    className="w-[100px] px-2 py-1 border rounded"
                  />
                ) : (
                  <span
                    onClick={() => {
                      setEditarFila(key);
                      setEditarCampo("repeticiones");
                    }}
                  >
                    {linea.repeticiones}
                  </span>
                )}
              </td>
              <td className="px-4 py-2 border border-gray-400 text-center align-middle">
                {editarFila === key && editarCampo === "kilos" ? (
                  <input
                    id="kilos"
                    type="number"
                    value={linea.kilos}
                    onChange={(e) => {
                      const updatedLineas = [...lineas];
                      updatedLineas[key].kilos = parseFloat(e.target.value);
                      setLineas(updatedLineas);
                    }}
                    onBlur={() => actualizaFila(key, "kilos")}
                    className="w-[100px] px-2 py-1 border rounded"
                  />
                ) : (
                  <span
                    onClick={() => {
                      setEditarFila(key);
                      setEditarCampo("kilos");
                    }}
                  >
                    {linea.kilos}
                  </span>
                )}
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
                {editarFila === key && editarCampo === "comentario" ? (
                  <input
                    type="text"
                    value={linea.comentario}
                    onChange={(e) => {
                      const updatedLineas = [...lineas];
                      updatedLineas[key].comentario = e.target.value;
                      setLineas(updatedLineas);
                    }}
                    onBlur={() => actualizaFila(key, "comentario")}
                  />
                ) : (
                  <span
                    onClick={() => {
                      setEditarFila(key);
                      setEditarCampo("comentario");
                    }}
                  >
                    {linea.comentario}
                  </span>
                )}
              </td>
              <td className="px-4 py-2 border border-gray-400 text-center align-middle">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mr-2">
                  Edit
                </button>
                <button
                  onClick={() => deleteLinea(linea.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full mr-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        meta={meta}
        fetchLineas={fetchLineas}
        firstPage={firstPage}
        previousPage={previousPage}
        nextPage={nextPage}
        lastPage={lastPage}
      />

      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          lineaId={lineaId}
        />
      )}
    </div>
  );
}
