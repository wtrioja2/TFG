import React from 'react';
import axios from "axios";
import axiosConfig from "../../config/axios-config";

export default function DeleteModal({setShowDeleteModal, lineaId, fetchLineas}) {
 
    const handleDelete = () => {
        axios
            .delete(
                `${import.meta.env.VITE_API_URL}/api/v1/lineassesion/${lineaId}`,
                axiosConfig
            )
            .then((response) => {
                fetchLineas(); 
                setShowDeleteModal(false); 
            })
            .catch((error) => {
                console.error('Error deleting line:', error);
            });
    };

    return (
        <div className="transition ease-in-out delay-150 bg-gray-500 bg-opacity-20 h-full w-full fixed top-0 left-0 text-gray-600">
                <div className="flex justify-center items-center h-full">
                    <div className="bg-white w-[800px] mx-auto rounded-lg shadow-lg p-6">
                        <p className="text-xl mb-2">
                            Are you sure you want to delete this item {lineaId}?
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
