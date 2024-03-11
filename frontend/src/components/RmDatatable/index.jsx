import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import axiosConfig from "../../config/axios-config";
import DeleteModal from "./DeleteModal";

export default function index() {
    const [ejercicios, setEjercicios] = useState([]);
    const [composicionCorporal, setComposicionCorporal] = useState([]);
    const [rms, setRms] = useState([]);
    const [links, setLinks] = useState([]);
    const [meta, setMeta] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [rmId, setRmId] = useState(null);
    //const [filterGroup, setFilterGroup] = useState("-1");

    useEffect(() => {
        // Obtén la lista de tipos de actividad y almacénalos en el estado
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/rm`)
            .then(response => {
                setRms(response.data.data);
            })
            .catch(error => {
                setError(error);
            });

            axios.get(`${import.meta.env.VITE_API_URL}/api/v1/ejercicios`)
            .then(response => {
                setEjercicios(response.data.data.reduce((acc, ejercicio) => {
                    acc[ejercicio.id] = ejercicio.nombre;
                    return acc;
                },{}
                ));
            })
            .catch(error => {
                setError(error);
            });

            axios.get(`${import.meta.env.VITE_API_URL}/api/v1/composicioncorporal`)
            .then(response => {
                setComposicionCorporal(response.data.data);
            })
            .catch(error => {
                setError(error);
            });            
    }, []);

    const getPesoMasAcutal = () => {
        if (composicionCorporal.length > 0) {
            const sortedComposicion = [...composicionCorporal].sort((a, b) => {
                return new Date(b.fecha) - new Date(a.fecha);
            });
            return sortedComposicion[0].peso;
        }
        return 0;
    };


    /**
     * Set the paginated data
     *
     * @param object response
     */
    const setPaginatedData = (response) => {
        //setOrigininalEjercicios(response.data.data);
        setRms(response.data.data);
        setLinks(response.data.links);
        setMeta(response.data.meta);
    };

    /**
     * Fetch all users
     */
    const fetchRm = async (link) => {
        if (link !== null) {
            const response = await axios.get(link, axiosConfig);
            setPaginatedData(response);
        }
    };

    /**
     * Handle the previous page
     */
    const previousPage = async () => {
        await fetchRm(links.prev);
    };

    /**
     * Handle the next page
     */
    const nextPage = async () => {
        await fetchRm(links.next);
    };

    /**
     * Handle the first page
     */
    const firstPage = async () => {
        await fetchRm(links.first);
    };

    /**
     * Handle the last page
     */
    const lastPage = async () => {
        await fetchRm(links.last);
    };

    /**
     * Delete de user
     * 
     * @param int ejercicioId 
     */
    const deleteRm = (rmId) => {
        setShowDeleteModal(true);
        setRmId(rmId);
    }


    return (
        <div className="mt-10">
            <div className="flex justify-between mb-3">
                <button 
                    //onClick={() => window.location.href = "/crearEjercicio"}
                    className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full mb-5">
                    Añadir RM
                </button>
            </div>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="text-left font-medium">
                        <th className="px-4 py-2 border border-gray-400">
                            Fecha
                        </th>
                        <th className="px-4 py-2 border border-gray-400">
                            Ejercicio 
                        </th>
                        <th className="px-4 py-2 border border-gray-400">
                            RM
                        </th>
                        <th className="px-4 py-2 border border-gray-400">
                            F. relativa
                        </th>
                        <th className="px-4 py-2 border border-gray-400">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rms.map((rm, key) => (
                        <tr key={key} className="text-left">
                            <td className="px-4 py-2 border border-gray-400">
                                {rm.fecha} 
                            </td>
                            <td className="px-4 py-2 border border-gray-400">
                                {ejercicios[rm.ejercicio_id]}
                            </td>
                            <td className="px-4 py-2 border border-gray-400">
                                {rm.rm}
                            </td>
                            <td className="px-4 py-2 border border-gray-400">
                                {getPesoMasAcutal() !== 0 ? (rm.rm / getPesoMasAcutal()).toFixed(2) : ''}
                            </td>
                            <td className="px-4 py-2 border border-gray-400">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mr-2">
                                    Edit
                                </button>
                                <button 
                                onClick={() => deleteRm(rm.id)}
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
                fetchRm={fetchRm}
                firstPage={firstPage}
                previousPage={previousPage}
                nextPage={nextPage}
                lastPage={lastPage}
            />

            {showDeleteModal &&  <DeleteModal setShowDeleteModal={setShowDeleteModal} rmId={rmId} />} 
            
        </div>
    );
}