import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import FormModal from "./FormModal";
import EntrenadorAtletaSelector from "../EntrenadorAtletaSelector";
import axiosConfig from "../../config/axios-config";

export default function Index({ user }) {
  const [composicionesCorporales, setComposicionesCorporales] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [composicionCorporalId, setComposicionCorporalId] = useState(null);

  const [formMode, setFormMode] = useState("create");
  const [defaultComposicionCorporalData, setDefaultComposicionCorporalData] = useState([]);

  const [selectedEntrenador, setSelectedEntrenador] = useState("");
  const [selectedAtleta, setSelectedAtleta] = useState(localStorage.getItem("atleta_id") || "");

  const handleEntrenadorChange = (entrenadorId) => {
    setSelectedEntrenador(entrenadorId);
  };

  const handleAtletaChange = (atletaId) => {
    setSelectedAtleta(atletaId);
  };

  const fetchComposicionesCorporales = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/composicioncorporal/indexById?atleta_id=${selectedAtleta}`,
        axiosConfig
      );
      setComposicionesCorporales(response.data.data);
    } catch (error) {
      console.error(
        "Error al obtener datos de la composición corporal:",
        error
      );
    }
  };

  useEffect(() => {
    if (selectedAtleta) {
      fetchComposicionesCorporales();
    }
  }, [selectedAtleta]);


  const createComposicionCorporal = () => {
    setShowFormModal(true);
    setFormMode("create");
    setComposicionCorporalId(null);
    setDefaultComposicionCorporalData({});
  };

  const updateComposicionCorporal = (comrposicionCorporalData) => {
    setShowFormModal(true);
    setFormMode("update");
    setComposicionCorporalId(comrposicionCorporalData.id);
    setDefaultComposicionCorporalData(comrposicionCorporalData);
  };

  const deleteComposicionCorporal = (composicionCorporalId) => {
    setShowDeleteModal(true);
    setComposicionCorporalId(composicionCorporalId);
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
        onClick={createComposicionCorporal}
        className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full mb-5"
      >
        Añadir Composición Corporal
      </button>

      <table className="table-auto w-full border">
        <thead>
          <tr className="text-left font-medium">
            <th className="px-4 py-2 border border-gray-400">Fecha</th>
            <th className="px-4 py-2 border border-gray-400">Altura</th>
            <th className="px-4 py-2 border border-gray-400">Peso</th>
            <th className="px-4 py-2 border border-gray-400">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {composicionesCorporales.length > 0 ? (
            composicionesCorporales.map((composicionCorporal, key) => (
              <tr key={key} className="text-left">
                <td className="px-4 py-2 border border-gray-400">
                  {formatDate(composicionCorporal.fecha)}
                </td>
                <td className="px-4 py-2 border border-gray-400">{composicionCorporal.altura}</td>
                <td className="px-4 py-2 border border-gray-400">{composicionCorporal.peso}</td>
                <td className="px-4 py-2 border border-gray-400">
                  <button
                    onClick={() => updateComposicionCorporal(composicionCorporal)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteComposicionCorporal(composicionCorporal.id)}
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
          composicionCorporalId={composicionCorporalId}
          fetchComposicionesCorporales={fetchComposicionesCorporales}
        />
      )}

      {showFormModal && (
        <FormModal
          setShowFormModal={setShowFormModal}
          formMode={formMode}
          composicionCorporalId={composicionCorporalId}
          defaultComposicionCorporalData={defaultComposicionCorporalData}
          fetchComposicionesCorporales={fetchComposicionesCorporales}
          selectedAtleta={selectedAtleta}
        />
      )}
    </div>
  );
}
