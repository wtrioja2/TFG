import React from "react";
import TopNavigation from "../components/TopNavigation";
import SidebarNavigation from "../components/SidebarNavigation";

export default function settings() {

    const userRol = localStorage.getItem("rol");
    
    return (
        <div className="h-screen">
            <TopNavigation />
            <div className="flex">
            <SidebarNavigation userRol={ userRol } />
                <main className="flex-1 p-6 ml-64" style={{ marginTop: '64px' }} >
                    <h1 className="w-full text-3xl text-gray-800 font-bold leading-tight">
                        Settings
                    </h1>
                </main>
            </div>
        </div>
    );
}
