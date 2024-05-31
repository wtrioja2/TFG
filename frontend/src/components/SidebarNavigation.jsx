import React from "react";
import { Link } from "react-router-dom";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScaleIcon from "@mui/icons-material/Scale";

export default function SidebarNavigation({ user }) {
  const sidebarItems = [
    { path: "/dashboard", text: "Inicio", icon: <HomeIcon fontSize="large" /> },
    {
      path: "/ejercicios",
      text: "Ejercicios",
      icon: <FitnessCenterIcon fontSize="large" />,
    },
    {
      path: "/planificacion",
      text: "Planificación",
      icon: <CalendarMonthIcon fontSize="large" />,
    },
    {
      path: "/sesiones",
      text: "Sesiones",
      icon: <CalendarTodayIcon fontSize="large" />,
    },
    { path: "/rm", text: "RM", icon: <TrendingUpIcon fontSize="large" /> },
    {
      path: "/composicionCorporal",
      text: "Composición Corporal",
      icon: <ScaleIcon fontSize="large" />,
    },
  ];

  if (user.rol === "admin") {
    sidebarItems.push({
      path: "/users",
      text: "Usuarios",
      icon: <GroupIcon fontSize="large" />,
    });
  }

  return (
    <div className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 fixed left-0 top-16 h-screen overflow-y-scroll">
      <div className="flex justify-center mt-4">
        <img
          src="https://i.imgur.com/DZHSc5X.png"
          alt="Logo de la aplicación"
          className="h-24 w-auto"
        />
      </div>
      <div className="px-6 py-10 flex items-center justify-between">
        <p className="text-md text-slate-500">Bienvenid@</p>
        <div className="text-base md:text-lg font-bold flex items-center">
          {user ? user.first_name : "Usuario"}
        </div>
      </div>
      <div className="w-full px-6">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-5 hover:bg-white/5 transition ease-linear duration-150"
          >
            <div>{item.icon}</div>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-5 text-white">
                {item.text}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
