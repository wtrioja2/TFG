import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import axiosConfig from "../../config/axios-config";
import DeleteModal from "./DeleteModal";
import SearchBox from "../SearchBox";
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export default function Index() {
    const [originalEjercicios, setOriginalEjercicios] = useState([]);
    const [ejercicios, setEjercicios] = useState([]);
    const [filterType, setFilterType] = useState("-1");
    const [filterMuscle, setFilterMuscle] = useState("-1");
    const [links, setLinks] = useState({});
    const [meta, setMeta] = useState({});

    useEffect(() => {
        fetchEjercicios();
    }, []);

    const fetchEjercicios = async (link = null) => {
        try {
            const response = await axios.get(link || `${import.meta.env.VITE_API_URL}/api/v1/ejercicios`, axiosConfig);
            setOriginalEjercicios(response.data.data);
            setEjercicios(response.data.data);
            setLinks(response.data.links);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching ejercicios:", error);
        }
    };

    const tiposActividad = ['fuerza', 'cardio', 'movilidad', 'otro'];
    const gruposMusculares = ['pecho', 'espalda', 'pierna', 'hombro', 'biceps', 'triceps', 'core', 'otro'];

    const handleTypeChange = async (event) => {
        const tipo = event.target.value;
        setFilterType(tipo);
        setFilterMuscle("-1");
        await handleFilterChange(tipo, "-1");
    };

    const handleMuscleChange = async (event) => {
        const grupoMuscular = event.target.value;
        setFilterMuscle(grupoMuscular);
        await handleFilterChange(filterType, grupoMuscular);
    };

    const handleFilterChange = async (tipo, grupoMuscular) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/ejercicios/filtrar?tipo=${tipo}&grupo_muscular=${grupoMuscular}`);
            setEjercicios(response.data.data);
            setLinks(response.data.links);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching ejercicios:", error);
        }
    };

    const handleSearchByName = async (searchTerm) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/ejercicios/nombre?nombre=${searchTerm}`);
            setEjercicios(response.data.data);
            setLinks(response.data.links);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching ejercicios:", error);
        }
    };

    const filteredEjercicios = filterType === "-1"
        ? ejercicios
        : ejercicios.filter(ejercicio => ejercicio.tipo === filterType && (filterMuscle === "-1" || ejercicio.grupo_muscular === filterMuscle));

    return (
        <div className="mt-10">
            <button onClick={() => window.location.href = "/crearEjercicio"} className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full mb-5 float:right">
                Añadir Ejercicio
            </button>
            <div className="flex justify-between mb-3">
                <FormControl variant="outlined" className="form-control mb-3 tercio">
                    <InputLabel id="tipo-label">Tipo de ejercicio</InputLabel>
                    <Select
                        labelId="tipo-label"
                        id="tipo"
                        value={filterType}
                        onChange={handleTypeChange}
                        label="Tipo de ejercicio"
                    >
                        <MenuItem value="-1">Ver todos los ejercicios</MenuItem>
                        {tiposActividad.map((tipo) => (
                            <MenuItem key={tipo} value={tipo}>
                                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {filterType === "fuerza" && (
                    <FormControl variant="outlined" className="form-control mb-3 tercio">
                        <InputLabel id="grupo-muscular-label">Grupo Muscular</InputLabel>
                        <Select
                            labelId="grupo-muscular-label"
                            id="grupo-muscular"
                            value={filterMuscle}
                            onChange={handleMuscleChange}
                            label="Grupo Muscular"
                        >
                            <MenuItem value="-1">Todos los grupos musculares</MenuItem>
                            {gruposMusculares.map((musculo) => (
                                <MenuItem key={musculo} value={musculo}>
                                    {musculo.charAt(0).toUpperCase() + musculo.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
                <SearchBox
                    className="form-control mb-3 tercio"
                    placeholder="Buscar por nombre"
                    onDebounce={handleSearchByName}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredEjercicios.map((ejercicio) => (
                    <div key={ejercicio.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <a href={ejercicio.url_video} target="_blank" rel="noopener noreferrer">
                            <img src={ejercicio.url_foto} alt={ejercicio.nombre} className="w-full h-48 object-cover" />
                        </a>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{ejercicio.nombre}</h2>
                            <p className="text-gray-700 mb-2">{ejercicio.descripcion}</p>
                            <div className="flex items-center">
                                <span className="text-gray-600 mr-2">Tipo:</span>
                                <span className="font-semibold text-gray-800">{ejercicio.tipo}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-600 mr-2">Grupo Muscular:</span>
                                <span className="font-semibold text-gray-800">{ejercicio.grupo_muscular}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                meta={meta}
                fetchEjercicios={fetchEjercicios}
                firstPage={fetchEjercicios.bind(null, links.first)}
                previousPage={fetchEjercicios.bind(null, links.prev)}
                nextPage={fetchEjercicios.bind(null, links.next)}
                lastPage={fetchEjercicios.bind(null, links.last)}
            />
        </div>
    );
}