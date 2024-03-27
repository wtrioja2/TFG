import React from 'react';
import './Avatar.css';

function Avatar({ nombre, apellido }) {
    // Obtener las iniciales del nombre y del apellido
    const inicialNombre = nombre ? nombre.charAt(0).toUpperCase() : '';
    const inicialApellido = apellido ? apellido.charAt(0).toUpperCase() : '';
  
    return (
      <div className="avatar">
        <div className="iniciales">
          {inicialNombre}
          {inicialApellido}
        </div>
      </div>
    );
  }
  
  export default Avatar;