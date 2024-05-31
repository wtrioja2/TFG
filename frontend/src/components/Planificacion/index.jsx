import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import axiosConfig from "../../config/axios-config";
import EntrenadorAtletaSelector from "../EntrenadorAtletaSelector";
import {FormControl, InputLabel, Select, MenuItem,} from "@mui/material";
import FormModalMacrociclo from "./FormModalMacrociclo";
import FormModalMesociclo from "./FormModalMesociclo";
import FormModalMicrociclo from "./FormModalMicrociclo";
import FormModalSesion from "./FormModalSesion";
import DeleteModal from "./DeleteModal";
import DeleteWarningModal from "../DeleteWarningModal";

export default function Index({ user }) {
  const [selectedEntrenador, setSelectedEntrenador] = useState("");
  const [selectedAtleta, setSelectedAtleta] = useState(localStorage.getItem("atleta_id") || "");
  const [loading, setLoading] = useState(true);
  const [macrociclos, setMacrociclos] = useState({});
  const [mesociclos, setMesociclos] = useState({});
  const [microciclos, setMicrociclos] = useState({});
  const [sesiones, setSesiones] = useState({});
  const [selectedMacrociclo, setSelectedMacrociclo] = useState("");
  const [selectedMesociclo, setSelectedMesociclo] = useState("");
  const [selectedMicrociclo, setSelectedMicrociclo] = useState("");
  const [selectedSesion, setSelectedSesion] = useState("");
  const [showFormModalMacrociclo, setShowFormModalMacrociclo] = useState(false);
  const [showFormModalMesociclo, setShowFormModalMesociclo] = useState(false);
  const [showFormModalMicrociclo, setShowFormModalMicrociclo] = useState(false);
  const [showFormModalSesion, setShowFormModalSesion] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [defaultMacrocicloData, setDefaultMacrocicloData] = useState({});
  const [defaultMesocicloData, setDefaultMesocicloData] = useState({});
  const [defaultMicrocicloData, setDefaultMicrocicloData] = useState({});
  const [defaultSesionData, setDefaultSesionData] = useState({});
  const [macrocicloId, setMacrocicloId] = useState(null);
  const [mesocicloId, setMesocicloId] = useState(null);
  const [microcicloId, setMicrocicloId] = useState(null);
  const [sesionId, setSesionId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [elementIdToDelete, setElementIdToDelete] = useState("");
  const [elementTypeToDelete, setElementTypeToDelete] = useState("");

  const handleEntrenadorChange = (entrenadorId) => {
    setSelectedEntrenador(entrenadorId);
  };

  const handleAtletaChange = (atletaId) => {
    setSelectedAtleta(atletaId);
    setSelectedMacrociclo("");
    setSelectedMesociclo("");
    setSelectedMicrociclo("");
    setSelectedSesion("");
  };

  const fetchMacrociclos = useCallback(async () => {
    try {
      setLoading(true);
      const macrociclosResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/macrociclos/indexById?atleta_id=${selectedAtleta}`,
        axiosConfig
      );
      setMacrociclos(macrociclosResponse.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener datos del calendario:", error);
      setLoading(false);
    }
  }, [selectedAtleta]);

  const fetchMesociclos = useCallback(async (macrocicloId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/mesociclos/indexByAtletaAndMacrociclo?atleta_id=${selectedAtleta}&macrociclo_id=${macrocicloId}`,
        axiosConfig
      );
      setMesociclos(response.data.data);
    } catch (error) {
      console.error("Error al obtener datos de los mesociclos:", error);
    }
  }, [selectedAtleta]);

  const fetchMicrociclos = useCallback(async (mesocicloId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/microciclos/indexByAtletaAndMesociclo?atleta_id=${selectedAtleta}&mesociclo_id=${mesocicloId}`,
        axiosConfig
      );
      setMicrociclos(response.data.data);
    } catch (error) {
      console.error("Error al obtener datos de los microciclos:", error);
    }
  }, [selectedAtleta]);

  const fetchSesiones = useCallback(async (microcicloId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/sesiones/indexByAtletaAndMicrociclo?atleta_id=${selectedAtleta}&microciclo_id=${microcicloId}`,
        axiosConfig
      );
      setSesiones(response.data.data);
    } catch (error) {
      console.error("Error al obtener datos de las sesiones:", error);
    }
  }, [selectedAtleta]);

  useEffect(() => {
    if (selectedAtleta) {
      fetchMacrociclos();
    }
  }, [selectedAtleta, fetchMacrociclos]);

  const createMacrociclo = () => {
    setShowFormModalMacrociclo(true);
    setFormMode("create");
    setMacrocicloId(null);
    setDefaultMacrocicloData({});
  };

  const createMesociclo = () => {
    setShowFormModalMesociclo(true);
    setFormMode("create");
    setMesocicloId(null);
    setDefaultMesocicloData({});
  };

  const createMicrociclo = () => {
    setShowFormModalMicrociclo(true);
    setFormMode("create");
    setMicrocicloId(null);
    setDefaultMicrocicloData({});
  };

  const createSesion = () => {
    setShowFormModalSesion(true);
    setFormMode("create");
    setSesionId(null);
    setDefaultSesionData({});
  };

  const updateMacrociclo = (macrocicloId) => {
    const selectedMacrociclo = macrociclos.find(
      (macrociclo) => macrociclo.id === macrocicloId
    );
    setShowFormModalMacrociclo(true);
    setFormMode("update");
    setMacrocicloId(macrocicloId);
    setDefaultMacrocicloData(selectedMacrociclo);
  };

  const updateMesociclo = (mesocicloId) => {
    const selectedMesociclo = mesociclos.find(
      (mesociclo) => mesociclo.id === mesocicloId
    );
    setShowFormModalMesociclo(true);
    setFormMode("update");
    setMesocicloId(mesocicloId);
    setDefaultMesocicloData(selectedMesociclo);
  };

  const updateMicrociclo = (microcicloId) => {
    const selectedMicrociclo = microciclos.find(
      (microciclo) => microciclo.id === microcicloId
    );
    setShowFormModalMicrociclo(true);
    setFormMode("update");
    setMicrocicloId(microcicloId);
    setDefaultMicrocicloData(selectedMicrociclo);
  };

  const updateSesion = (sesionId) => {
    const selectedSesion = sesiones.find((sesion) => sesion.id === sesionId);
    setShowFormModalSesion(true);
    setFormMode("update");
    setSesionId(sesionId);
    setDefaultSesionData(selectedSesion);
  };

  const deleteMacrociclo = (macrocicloId) => {
    setShowDeleteModal(true);
    setElementIdToDelete(macrocicloId);
    setElementTypeToDelete("macrociclo");
  };

  const deleteMesociclo = (mesocicloId) => {
    setShowDeleteModal(true);
    setElementIdToDelete(mesocicloId);
    setElementTypeToDelete("mesociclo");
  };

  const deleteMicrociclo = (microcicloId) => {
    setShowDeleteModal(true);
    setElementIdToDelete(microcicloId);
    setElementTypeToDelete("microciclo");
  };

  const deleteSesion = (sesionId) => {
    setShowDeleteModal(true);
    setElementIdToDelete(sesionId);
    setElementTypeToDelete("sesion");
  };

  const handleMacrocicloChange = (event) => {
    const macrocicloId = event.target.value;
    setSelectedMacrociclo(macrocicloId);
    setDefaultMacrocicloData(macrocicloId);
    setMesociclos({});
    setMicrociclos({});
    setSesiones({});
    fetchMesociclos(macrocicloId);
    setSelectedMesociclo("");
    setSelectedMicrociclo("");
    setSelectedSesion("");
  };

  const handleMesocicloChange = (event) => {
    const mesocicloId = event.target.value;
    setSelectedMesociclo(mesocicloId);
    setDefaultMesocicloData(mesocicloId);
    setMicrociclos({});
    setSesiones({});
    fetchMicrociclos(mesocicloId);
    setSelectedMicrociclo("");
    setSelectedSesion("");
  };

  const handleMicrocicloChange = (event) => {
    const microcicloId = event.target.value;
    setSelectedMicrociclo(microcicloId);
    setDefaultMicrocicloData(microcicloId);
    setSesiones({});
    fetchSesiones(microcicloId);
    setSelectedSesion("");
  };

  const handleSesionChange = (event) => {
    const sesionId = event.target.value;
    setSelectedSesion(sesionId);
    setDefaultSesionData(sesionId);
  };

  const handleCloseWarningModal = () => {
    setShowWarningModal(false); // Cambia el estado para ocultar el modal de advertencia
  };

  return (
    <div className="mt-10">
      <EntrenadorAtletaSelector
        user={user}
        onEntrenadorChange={handleEntrenadorChange}
        onAtletaChange={handleAtletaChange}
      />
      {(selectedAtleta || macrociclos.length > 0) && (
        <div className="flex justify-between items-center mb-4">
          {selectedAtleta && (
            <button
              onClick={createMacrociclo}
              className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full mb-5 float:right"
              style={{ width: "174px" }}
            >
              Crear Macrociclo
            </button>
          )}
          {!loading && macrociclos.length > 0 && (
            <FormControl variant="outlined" className="form-control tercio">
              <InputLabel id="macrociclo-label">
                Seleccionar Macrociclo
              </InputLabel>
              <Select
                labelId="macrociclo-label"
                id="macrociclo-select"
                value={selectedMacrociclo}
                onChange={handleMacrocicloChange}
                label="Seleccionar Macrociclo"
              >
                <MenuItem value="">Seleccionar Macrociclo</MenuItem>
                {macrociclos.map((macrociclo) => (
                  <MenuItem key={macrociclo.id} value={macrociclo.id}>
                    {macrociclo.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {selectedMacrociclo && (
            <div>
              <button
                onClick={() => updateMacrociclo(selectedMacrociclo)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mr-2"
              >
                Actualizar
              </button>
              <button
                onClick={() => deleteMacrociclo(selectedMacrociclo)}
                className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full mr-2"
              >
                Borrar
              </button>
            </div>
          )}
        </div>
      )}

      {(selectedMacrociclo || mesociclos.length > 0) && (
        <div className="flex justify-between items-center mb-4">
          {selectedMacrociclo && (
            <button
              onClick={createMesociclo}
              className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full mb-5 float:right"
              style={{ width: "174px" }}
            >
              Crear Mesociclo
            </button>
          )}
          {selectedMacrociclo && mesociclos.length > 0 && (
            <FormControl
              variant="outlined"
              className="form-control mb-3 tercio"
            >
              <InputLabel id="mesociclo-label">
                Seleccionar Mesociclo
              </InputLabel>
              <Select
                labelId="mesociclo-label"
                id="mesociclo-select"
                value={selectedMesociclo}
                onChange={handleMesocicloChange}
                label="Seleccionar Mesociclo"
              >
                <MenuItem value="">Seleccionar Mesociclo</MenuItem>
                {mesociclos.map((mesociclo) => (
                  <MenuItem key={mesociclo.id} value={mesociclo.id}>
                    {mesociclo.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {selectedMesociclo && (
            <div>
              <button
                onClick={() => updateMesociclo(selectedMesociclo)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mr-2"
              >
                Actualizar
              </button>
              <button
                onClick={() => deleteMesociclo(selectedMesociclo)}
                className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full mr-2"
              >
                Borrar
              </button>
            </div>
          )}
        </div>
      )}

      {(selectedMesociclo || microciclos.length > 0) && (
        <div className="flex justify-between items-center mb-4">
          {selectedMesociclo && (
            <button
              onClick={createMicrociclo}
              className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full mb-5 float:right"
              style={{ width: "174px" }}
            >
              Crear Microciclo
            </button>
          )}
          {selectedMesociclo && microciclos.length > 0 && (
            <FormControl
              variant="outlined"
              className="form-control mb-3 tercio"
            >
              <InputLabel id="microciclo-label">
                Seleccionar Microciclo
              </InputLabel>
              <Select
                labelId="microciclo-label"
                id="microciclo-select"
                value={selectedMicrociclo}
                onChange={handleMicrocicloChange}
                label="Seleccionar Microciclo"
              >
                <MenuItem value="">Seleccionar Microciclo</MenuItem>
                {microciclos.map((microciclo) => (
                  <MenuItem key={microciclo.id} value={microciclo.id}>
                    {microciclo.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {selectedMicrociclo && (
            <div>
              <button
                onClick={() => updateMicrociclo(selectedMicrociclo)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mr-2"
              >
                Actualizar
              </button>
              <button
                onClick={() => deleteMicrociclo(selectedMicrociclo)}
                className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full mr-2"
              >
                Borrar
              </button>
            </div>
          )}
        </div>
      )}

      {(selectedMicrociclo || sesiones.length > 0) && (
        <div className="flex justify-between items-center mb-4">
          {selectedMicrociclo && (
            <button
              onClick={createSesion}
              className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full mb-5 float:right"
              style={{ width: "174px" }}
            >
              Crear Sesión
            </button>
          )}
          {selectedMicrociclo && sesiones.length > 0 && (
            <FormControl
              variant="outlined"
              className="form-control mb-3 tercio"
            >
              <InputLabel id="sesion-label">Seleccionar Sesión</InputLabel>
              <Select
                labelId="sesion-label"
                id="sesion-select"
                value={selectedSesion}
                onChange={handleSesionChange}
                label="Seleccionar Sesion"
              >
                <MenuItem value="">Seleccionar Sesion</MenuItem>
                {sesiones.map((sesion) => (
                  <MenuItem key={sesion.id} value={sesion.id}>
                    {sesion.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {selectedSesion && (
            <div>
              <button
                onClick={() => updateSesion(selectedSesion)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mr-2"
              >
                Actualizar
              </button>
              <button
                onClick={() => deleteSesion(selectedSesion)}
                className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full mr-2"
              >
                Borrar
              </button>
            </div>
          )}
        </div>
      )}
      {showFormModalMacrociclo && (
        <FormModalMacrociclo
          setShowFormModalMacrociclo={setShowFormModalMacrociclo}
          formMode={formMode}
          macrocicloId={macrocicloId}
          defaultMacrocicloData={defaultMacrocicloData}
          fetchMacrociclos={fetchMacrociclos}
          selectedAtleta={selectedAtleta}
        />
      )}
      {showFormModalMesociclo && (
        <FormModalMesociclo
          setShowFormModalMesociclo={setShowFormModalMesociclo}
          formMode={formMode}
          mesocicloId={mesocicloId}
          defaultMesocicloData={defaultMesocicloData}
          fetchMesociclos={fetchMesociclos}
          selectedAtleta={selectedAtleta}
          selectedMacrociclo={selectedMacrociclo}
        />
      )}
      {showFormModalMicrociclo && (
        <FormModalMicrociclo
          setShowFormModalMicrociclo={setShowFormModalMicrociclo}
          formMode={formMode}
          microcicloId={microcicloId}
          defaultMicrocicloData={defaultMicrocicloData}
          fetchMicrociclos={fetchMicrociclos}
          selectedAtleta={selectedAtleta}
          selectedMesociclo={selectedMesociclo}
        />
      )}
      {showFormModalSesion && (
        <FormModalSesion
          setShowFormModalSesion={setShowFormModalSesion}
          formMode={formMode}
          sesionId={sesionId}
          defaultSesionData={defaultSesionData}
          fetchSesiones={fetchSesiones}
          selectedAtleta={selectedAtleta}
          selectedMicrociclo={selectedMicrociclo}
        />
      )}
      {showWarningModal && (
        <DeleteWarningModal
          objectName="el macrociclo"
          onClose={handleCloseWarningModal}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          elementIdToDelete={elementIdToDelete}
          elementTypeToDelete={elementTypeToDelete}
          onDelete={() => {
            // Lógica para manejar la eliminación
            switch (elementTypeToDelete) {
              case "macrociclo":
                fetchMacrociclos(); // Llama a fetchMacrociclos
                break;
              case "mesociclo":
                fetchMesociclos(selectedMacrociclo); // Llama a fetchMesociclos con el macrociclo seleccionado
                break;
              case "microciclo":
                fetchMicrociclos(selectedMesociclo); // Llama a fetchMicrociclos con el mesociclo seleccionado
                break;
              case "sesion":
                fetchSesiones(selectedMicrociclo); // Llama a fetchSesiones con el microciclo seleccionado
                break;
              default:
                console.error(
                  "Tipo de elemento no reconocido en Index:",
                  elementTypeToDelete
                );
            }
          }}
        />
      )}
    </div>
  );
}
