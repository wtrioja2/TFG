import React from "react";
import axios from "axios";
import axiosConfig from "../../config/axios-config";

export default function DeleteModal({ setShowDeleteModal, elementIdToDelete, elementTypeToDelete, onDelete  }) {
  const handleDelete = () => {
    let endpoint = "";

    // Construir la URL del endpoint en función del tipo de elemento
    switch (elementTypeToDelete) {
      case "macrociclo":
        endpoint = `api/v1/macrociclos/${elementIdToDelete}`;
        break;
      case "mesociclo":
        endpoint = `api/v1/mesociclos/${elementIdToDelete}`;
        break;
      case "microciclo":
        endpoint = `api/v1/microciclos/${elementIdToDelete}`;
        break;
      case "sesion":
        endpoint = `api/v1/sesiones/${elementIdToDelete}`;
        break;
      default:
        // Tipo de elemento no reconocido
        console.error("Tipo de elemento no reconocido en Modal:", elementTypeToDelete);
        return;
    }

    axios
      .delete(`${import.meta.env.VITE_API_URL}/${endpoint}`, axiosConfig)
      .then((response) => {
        // Redireccionar después de la eliminación (opcional)
        setShowDeleteModal(false);
        onDelete(elementTypeToDelete);
      })
      .catch((error) => {
        // Manejar errores de eliminación
        console.error("Error al eliminar el elemento:", error);
      });

    setShowDeleteModal(false);
  };

  return (
    <div className="transition ease-in-out delay-150 bg-gray-500 bg-opacity-20 h-full w-full fixed top-0 left-0 text-gray-600" style={{ zIndex: 9999 }}>
      <div className="flex justify-center items-center h-full">
        <div className="bg-white w-[800px] mx-auto rounded-lg shadow-lg p-6">
          <p className="text-xl mb-2">
            ¿Estás seguro de querer borrar el elemento?
          </p>
          <div className="flex justify-between mt-5">
            <button
              onClick={() => {
                setShowDeleteModal(false);
              }}
              className="bg-gray-500 text-white p-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-green-500 text-white p-2 rounded-md"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
