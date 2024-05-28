import React from "react";

const DeleteWarningModal = ({ onClose, objectName }) => {
  return (
    <div className="delete-warning-modal">
      <h2>Advertencia</h2>
      <p>No se puede eliminar {objectName} porque tiene elementos asociados.</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default DeleteWarningModal;
