import React from "react";
import axios from "axios";
import axiosConfig from "../config/axios-config";
import ScaleIcon from "@mui/icons-material/Scale";

export default function TopNavigation() {
  /**
   * Handle the logout
   */
  const handleLogout = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/v1/logout`, {}, axiosConfig)
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
      <div className="flex justify-between h-16 items-center">
        <div className="flex items-center">
          <div className="my-4 px-6">
            <span className="text-4xl font-bold text-white"> 
              Hangar
              <span className="text-orange"> Gym</span>
            </span>
            <span className="text-slate-500 text-2xl ml-20"> 
              Controla tus entrenamientos
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleLogout}
            className="bg-gray-900 text-white px-4 py-3 rounded-md text-sm font-medium focus:outline-none focus:bg-gray-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
  );
}
