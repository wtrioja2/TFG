import React, { useContext } from "react";
import { Link } from "react-router-dom";

export default function SidebarNavigation({ user }) {

    const sidebarItems = [
        { path: "/dashboard", text: "Dashboard"},
        { path: "/ejercicios", text: "Ejercicios"},
        { path: "/sesiones", text: "Sesiones"},
        { path: "/lineassesion", text: "Líneas de sesión"},
        { path: "/rm", text: "RM"},
    ];

    if (user.rol === "entrenador") {
        sidebarItems.push(
            { path: "/atletas", text: "Atletas"}
        );
    } else if (user.rol === "admin") {
        sidebarItems.push(
            { path: "/atletas", text: "Atletas"},
            { path: "/entrenadores", text: "Entrenadores"},
            { path: "/users", text: "Usuarios"},
        );
    }

    return (
       /*  <aside className="h-screen bg-gray-200">
            <div className="flex flex-col w-64 bg-gray-800 h-full text-gray-100">
                <nav className="flex flex-col flex-1 py-4">
                    {sidebarItems.map((item, index) => (
                        <Link   
                            key={index}
                            to={item.path}
                            className="flex items-center mt-4 py-2 px-6 bg-opacity-25 text-gray-100 hover:bg-gray-700 hover:border-l-4 hover:border-blue-500"
                        >
                            <i className="fas fa-tachometer-alt mr-3"></i>
                            {item.text}
                        </Link>
                    ))}
                </nav>
            </div>
        </aside> */

        
        <div className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 fixed left-0 top-16 h-screen overflow-y-scroll">
             <div className="my-4 px-6">
                <h1 className="text-lg md:text-2xl font-bold text-white">Dash<span className="text-blue-500">8</span>.</h1>
                <p className="text-slate-500 text-sm">Manage your actions and activities</p>
            </div>
            <div className="px-6 py-10">
                <p className="text-slate-500">Bienvenido,</p>
                <Link to="#" className="inline-flex space-x-2 items-center">
                    <span>
                        <img className="rounded-full w-8 h-8" src="" alt="Imagén del Avatar" />
                    </span>
                    <span className="text-sm md:text-base font-bold">
                        {user ? user.first_name : "Usuario"}
                    </span>
                </Link>
            </div> 
            <div className="w-full px-6">
                {sidebarItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className="w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150"
                    >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25a2.25 2.25 0 01-2.25 2.25H16a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H16a2.25 2.25 0 01-2.25-2.25v-2.25z" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold leading-5 text-white">{item.text}</span>
                            <span className="text-sm text-white/50 hidden md:block">Data Overview</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
