import React from 'react';
import axios from "axios";
import axiosConfig from "../../config/axios-config";

export default function DeleteModal({setShowDeleteModal, ejercicioId}) {
 
    const handleDelete = () => {
        axios
            .delete(
                `${import.meta.env.VITE_API_URL}/api/v1/ejercicios/${ejercicioId}`,
                axiosConfig
            )
            .then((response) =>{
                window.location.replace("/ejercicios");
            });
            setShowDeleteModal(false);
        }

    return (
        <div className="transition ease-in-out delay-150 bg-gray-500 bg-opacity-20 h-full w-full fixed top-0 left-0 text-gray-600">
                <div className="flex justify-center items-center h-full">
                    <div className="bg-white w-[800px] mx-auto rounded-lg shadow-lg p-6">
                        <p className="text-xl mb-2">
                            ¿Estás seguro de querer borrar el ejercicio {ejercicioId}?
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
  )
}
