import React from "react";
import axios from "axios";
import axiosConfig from "../config/axios-config";

export default function TopNavigation() {
    /**
     * Handle the logout
     */
    const handleLogout = () => {
        axios
            .post(
                `${import.meta.env.VITE_API_URL}/api/v1/logout`,
                {},
                axiosConfig
            )
            .then(() => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("user");
                localStorage.removeItem("atleta_id");
                localStorage.removeItem("apodo");
                localStorage.removeItem("entrenador_id");

                window.location.href = "/login";
            });
    };

    return (

        <nav className="bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-white text-lg font-bold">
                                {import.meta.env.VITE_APP_NAME}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={handleLogout}
                            className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:bg-gray-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
