import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosConfig from "../../config/axios-config";
import DeleteModal from "./DeleteModal";
import FormModal from "./FormModal";
import EntrenadorAtletaSelector from "../EntrenadorAtletaSelector";

export default function Index({ user }) {
  const [ejercicios, setEjercicios] = useState([]);
  const [ejerciciosMap, setEjerciciosMap] = useState({});
  const [composicionCorporal, setComposicionCorporal] = useState([]);
  const [rms, setRms] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [rmId, setRmId] = useState(null);

  const [formMode, setFormMode] = useState("create");
  const [defaultRmData, setDefaultRmData] = useState([]);

  const [selectedEntrenador, setSelectedEntrenador] = useState("");
  const [selectedAtleta, setSelectedAtleta] = useState(localStorage.getItem("atleta_id") || "");

  const handleEntrenadorChange = (entrenadorId) => {
    setSelectedEntrenador(entrenadorId);
  };

  const handleAtletaChange = (atletaId) => {
    setSelectedAtleta(atletaId);
  };

  const fetchRms = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/rm/indexById?atleta_id=${selectedAtleta}`, axiosConfig)
      .then((response) => {
        setRms(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de las RM:", error);
      });
  };

  const fetchComposicionCorporal = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/composicioncorporal/indexById?atleta_id=${selectedAtleta}`
        , axiosConfig);
      setComposicionCorporal(response.data.data);
    } catch (error) {
      console.error(
        "Error al obtener datos de la composición corporal:",
        error
      );
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/ejercicios/todos`, axiosConfig)
      .then((response) => {
        const ejerciciosData = response.data;
        setEjercicios(ejerciciosData);

        const ejerciciosMapData = {};
        ejerciciosData.forEach((ejercicio) => {
          ejerciciosMapData[ejercicio.id] = ejercicio.nombre;
        });
        setEjerciciosMap(ejerciciosMapData);
      })
      .catch((error) => {
        console.error("Error al obtener los ejercicios:", error);
      });

    if (selectedAtleta) {
      fetchRms();
      fetchComposicionCorporal();
    }
  }, [selectedAtleta]);

  const getPesoMasAcutal = () => {
    if (composicionCorporal.length > 0) {
      const sortedComposicion = [...composicionCorporal].sort((a, b) => {
        return new Date(b.fecha) - new Date(a.fecha);
      });
      return sortedComposicion[0].peso;
    }
    return 0;
  };

  const createRm = () => {
    setShowFormModal(true);
    setFormMode("create");
    setRmId(null);
    setDefaultRmData({});
  };

  const updateRm = (rmData) => {
    setShowFormModal(true);
    setFormMode("update");
    setRmId(rmData.id);
    setDefaultRmData(rmData);
  };

  const deleteRm = (rmId) => {
    setShowDeleteModal(true);
    setRmId(rmId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("es-ES", options);
  };

  return (
    <div className="mt-10">
      <EntrenadorAtletaSelector
        user={user}
        onEntrenadorChange={handleEntrenadorChange}
        onAtletaChange={handleAtletaChange}
      />
      <button
        onClick={createRm}
        className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full mb-5"
      >
        Añadir RM
      </button>

      <table className="table-auto w-full border">
        <thead>
          <tr className="text-left font-medium">
            <th className="px-4 py-2 border border-gray-400">Fecha</th>
            <th className="px-4 py-2 border border-gray-400">Ejercicio</th>
            <th className="px-4 py-2 border border-gray-400">RM</th>
            <th className="px-4 py-2 border border-gray-400">F. relativa</th>
            <th className="px-4 py-2 border border-gray-400">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rms.length > 0 ? (
            rms.map((rm, key) => (
              <tr key={key} className="text-left">
                <td className="px-4 py-2 border border-gray-400">
                  {formatDate(rm.fecha)}
                </td>
                <td className="px-4 py-2 border border-gray-400">
                  {ejerciciosMap[rm.ejercicio_id] || "Desconocido"}
                </td>
                <td className="px-4 py-2 border border-gray-400">{rm.rm}</td>
                <td className="px-4 py-2 border border-gray-400">
                  {getPesoMasAcutal() !== 0
                    ? (rm.rm / getPesoMasAcutal()).toFixed(2)
                    : ""}
                </td>
                <td className="px-4 py-2 border border-gray-400">
                  <button
                    onClick={() => updateRm(rm)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRm(rm.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full mr-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="px-4 py-2 border border-gray-400 text-center"
              >
                No hay registros disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          rmId={rmId}
          fetchRms={fetchRms}
        />
      )}

      {showFormModal && (
        <FormModal
          setShowFormModal={setShowFormModal}
          formMode={formMode}
          rmId={rmId}
          defaultRmData={defaultRmData}
          fetchRms={fetchRms}
          ejercicios={ejercicios}
          selectedAtleta={selectedAtleta}
        />
      )}
    </div>
  );
}
