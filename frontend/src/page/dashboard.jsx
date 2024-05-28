import React from "react";
import TopNavigation from "../components/TopNavigation";
import SidebarNavigation from "../components/SidebarNavigation";
import Dashboard from "../components/Dashboard";

export default function atletaDashboard() {

    const user = JSON.parse(localStorage.getItem("user"));
    
    return (
        <div className="h-screen">
            <TopNavigation />
            <div className="flex">
                <SidebarNavigation user={user} />
                <main className="flex-1 p-6 ml-64" style={{ marginTop: '64px' }} >
                    <h1 className="w-full text-3xl text-gray-800 font-bold leading-tight">
                        Dashboard
                    </h1>
                    <Dashboard user={user} />
                </main>
            </div>
        </div>
    );
}

