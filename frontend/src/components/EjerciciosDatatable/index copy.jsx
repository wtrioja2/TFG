import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import axiosConfig from "../../config/axios-config";
import DeleteModal from "./DeleteModal";

export default function index() {
    const [originalEjercicios, setOrigininalEjercicios] = useState([]);
    const [ejercicios, setEjercicios] = useState([]);
    const [tiposActividad, setTiposActividad] = useState([]);
    const [links, setLinks] = useState([]);
    const [meta, setMeta] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [ejercicioId, setEjercicioId] = useState(null);
    const [filterGroup, setFilterGroup] = useState("-1");

    useEffect(() => {
        // Obtén la lista de tipos de actividad y almacénalos en el estado
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/tiposactividad`)
            .then(response => {
                setTiposActividad(response.data.data);
            })
            .catch(error => {
                setError(error);
            });

            // Fetch inicial de ejercicios al cargar la página
        fetchEjercicios(`${import.meta.env.VITE_API_URL}/api/v1/ejercicios`);
    }, []);

    const handleFilterChange = (event) => {
        setFilterGroup(event.target.value)
    };

    /**
     * Set the paginated data
     *
     * @param object response
     */
    const setPaginatedData = (response) => {
        setOrigininalEjercicios(response.data.data);
        setEjercicios(response.data.data);
        setLinks(response.data.links);
        setMeta(response.data.meta);
    };

    /**
     * Fetch all users
     */
    const fetchEjercicios = async (link) => {
        if (link !== null) {
            const response = await axios.get(link, axiosConfig);
            setPaginatedData(response);
        }
    };

    /**
     * Handle the previous page
     */
    const previousPage = async () => {
        await fetchEjercicios(links.prev);
    };

    /**
     * Handle the next page
     */
    const nextPage = async () => {
        await fetchEjercicios(links.next);
    };

    /**
     * Handle the first page
     */
    const firstPage = async () => {
        await fetchEjercicios(links.first);
    };

    /**
     * Handle the last page
     */
    const lastPage = async () => {
        await fetchEjercicios(links.last);
    };

    /**
     * Delete de user
     * 
     * @param int ejercicioId 
     */
    const deleteEjercicio = (ejercicioId) => {
        setShowDeleteModal(true);
        setEjercicioId(ejercicioId);
    }

    useEffect(() => {
        // Filtrar los ejercicios según el tipo de actividad seleccionado
        const filteredEjercicios = filterGroup === "-1"
            ? originalEjercicios
            : originalEjercicios.filter(ejercicio => ejercicio.tipo_actividad_id === parseInt(filterGroup));

        setEjercicios(filteredEjercicios);
    }, [filterGroup, originalEjercicios]);

    return (
        <div className="mt-10">
            <div className="flex justify-between mb-3">
                <select
                    className="form-control mb-3"
                    value={filterGroup}
                    onChange={handleFilterChange}
                >
                    <option value="-1">Ver todos los ejercicios</option>
                    {tiposActividad.map((tipoActividad)  => (                             
                    <option key={tipoActividad.id} value={tipoActividad.id}>
                        {tipoActividad.nombre}
                    </option>
                    ))}   
                </select>
                <button 
                    onClick={() => window.location.href = "/crearEjercicio"}
                    className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full mb-5">
                    Añadir Ejercicio
                </button>
            </div>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="text-left font-medium">
                        <th className="px-4 py-2 border border-gray-400">
                            Nombre
                        </th>
                        <th className="px-4 py-2 border border-gray-400">
                            Vídeo 
                        </th>
                        <th className="px-4 py-2 border border-gray-400">
                            Tipo de actividad
                        </th>
                        <th className="px-4 py-2 border border-gray-400">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {ejercicios.map((ejercicio, key) => (
                        <tr key={key} className="text-left">
                            <td className="px-4 py-2 border border-gray-400">
                                {ejercicio.nombre} 
                            </td>
                            <td className="px-4 py-2 border border-gray-400">
                            <iframe 
                                width="200" 
                                height="150" 
                                src="https://www.youtube.com/embed/0viRpQwovQs" 
                                title="YouTube video player" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowfullscreen>
                            </iframe>
                            </td>
                            <td className="px-4 py-2 border border-gray-400">
                                {ejercicio.tipo_actividad_id}
                            </td>
                            <td className="px-4 py-2 border border-gray-400">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mr-2">
                                    Edit
                                </button>
                                <button 
                                onClick={() => deleteEjercicio(ejercicio.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full mr-2">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                meta={meta}
                fetchEjercicios={fetchEjercicios}
                firstPage={firstPage}
                previousPage={previousPage}
                nextPage={nextPage}
                lastPage={lastPage}
            />

            {showDeleteModal &&  <DeleteModal setShowDeleteModal={setShowDeleteModal} ejercicioId={ejercicioId} />} 
            
        </div>
    );
}