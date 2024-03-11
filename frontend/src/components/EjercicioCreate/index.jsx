import React, { useState, useEffect } from "react";
import axios from "axios";



export default function index() {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // State for success message


    const handleSubmit = async (e) => {
        e.preventDefault();
        const nombre = e.target.nombre.value;
        const url_foto = e.target.url_foto.value;
        const url_video = e.target.url_video.value;
        const descripcion = e.target.descripcion.value;
        const tipo = e.target.tipo.value;
        const grupo_muscular = e.target.grupo_muscular.value;

        
        axios
            .post(`${import.meta.env.VITE_API_URL}/api/v1/ejercicios`, {
                nombre,
                url_foto,
                url_video,
                descripcion,
                tipo,
                grupo_muscular,
            })
            .then(() => {
                setSuccessMessage("Ejercicio guardado con éxito."); 
                setError(null); 
            })
            .catch((err) => {
                setError(err?.response?.data?.errors);
                setSuccessMessage(null);
            });

            setTimeout(() => {
                setSuccessMessage(null); 
                useEffect(window.location.href = "/ejercicios");
            }, 1500); 
    };
    
    return (
        <div className="grid  text-gray-500">
            <div className="bg-white shadow-lg p-10 w-[500px]">
                <form
                    method="POST"
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-2 py-10"
                >
                    <div className="grid grid-cols-1 gap-2">
                        <label
                            htmlFor="nombre"
                            className="cursor-pointer font-semibold"
                        >
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            placeholder="Introduce el nombre..."
                            className="border px-3 p-2"
                        />
                        <span className="text-red-500 text-sm">
                            {error?.nombre} 
                        </span>
                        <label
                            htmlFor="url_foto"
                            className="cursor-pointer font-semibold"
                        >
                            Url de la foto
                        </label>
                        <input
                            type="text"
                            name="url_video"
                            id="url_video"
                            placeholder="Introduce la url de la foto..."
                            className="border px-3 p-2"
                        />
                        <span className="text-red-500 text-sm">
                            {error?.url_video} 
                        </span>
                        <label
                            htmlFor="url_video"
                            className="cursor-pointer font-semibold"
                        >
                            Url del vídeo
                        </label>
                        <input
                            type="text"
                            name="url_video"
                            id="url_video"
                            placeholder="Introduce la url del vídeo..."
                            className="border px-3 p-2"
                        />
                        <span className="text-red-500 text-sm">
                            {error?.url_video} 
                        </span>
                        <label
                            htmlFor="tipo_actividad_id"
                            className="cursor-pointer font-semibold"
                        >
                            Tipo de Actividad
                        </label>
                        <select name="tipo" className="border px-3 p-2"> 
                            <option value="fuerza" selected>Fuerza</option>
                            <option value="cardio">Cardio</option>
                            <option value="movilidad">Movilidad</option>
                            <option value="otro">Otro</option>

                       {/*      <option value="">Elige una opción</option>
                               {tipo.map((tipo)  => (
                             
                                <option key={tipoActividad.id} value={tipoActividad.id}>
                                {tipoActividad.nombre}
                                </option>
                            ))}   */} 
                        </select>
                        <select name="grupo_muscular" className="border px-3 p-2"> 
                            <option value="otro" selected>Otro</option>
                            <option value="pecho">Pecho</option>
                            <option value="espalda">Espalda</option>
                            <option value="pierna">Pierna</option>
                            <option value="hombro">Hombro</option>
                            <option value="biceps">Bíceps</option>
                            <option value="tricpes">Tríceps</option>
                            <option value="core">Core</option>

                       {/*      <option value="">Elige una opción</option>
                               {tipo.map((tipo)  => (
                             
                                <option key={tipoActividad.id} value={tipoActividad.id}>
                                {tipoActividad.nombre}
                                </option>
                            ))}   */} 
                        </select>
                        <span className="text-red-500 text-sm">
                            {error?.tipo_actividad_id}
                        </span>
                    </div>

                    <button className="mt-5 bg-blue-700 text-white  py-2 text-center rounded-sm hover:bg-blue-800">
                        Guardar
                    </button>
                    {successMessage && (
                        <p className="text-green-500 mt-2">{successMessage}</p>
                    )}
            </form>
        </div>
    </div>
    );
}