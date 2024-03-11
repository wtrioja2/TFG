import React from "react";
import TopNavigation from "../components/TopNavigation";
import SidebarNavigation from "../components/SidebarNavigation";
import EjerciciosDatatable from "../components/EjerciciosDatatable";

export default function users() {
    
    const userRol = localStorage.getItem("rol");

    return (
        <div className="h-screen">
            <TopNavigation />
            <div className="flex">
                <SidebarNavigation userRol={ userRol } />
                <main className="flex-1 p-6 ml-64" style={{ marginTop: '64px' }} >
                    <h1 className="w-full text-3xl text-gray-800 font-bold leading-tight">
                        Ejercicios
                    </h1>
                    <EjerciciosDatatable />
                </main>
            </div>
        </div>
    );
}