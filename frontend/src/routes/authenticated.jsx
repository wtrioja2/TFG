import { createBrowserRouter } from "react-router-dom";
import Settings from "../page/settings";
import Users from "../page/users";
import Ejercicios from "../page/ejercicios";
import CrearEjercicio from "../page/crearEjercicio";
import Sesiones from "../page/sesiones";
import LineasSesion from "../page/lineasSesion";
import Rm from "../page/rm";
import Dashboard  from "../page/dashboard";
import AdminDashboard  from "../page/adminDashboard";



export default createBrowserRouter([
    /* {
        path: "/admin-dashboard",
        element: <AdminDashboard />,
    },
    {
        path: "/entrenador-dashboard",
        element: <EntrenadorDashboard />,
    },
    {
        path: "/atleta-dashboard",
        element: <AtletaDashboard />,
    }, */
    {
        path: '/',
        element: <Dashboard />
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/admin-dashboard",
        element: <AdminDashboard />,
    },
    {
        path: "/settings",
        element: <Settings />,
    },
    {
        path: "/users",
        element: <Users />,
    },
    {
        path: "/ejercicios",
        element: <Ejercicios />,
    },
    {
        path: "/crearEjercicio",
        element: <CrearEjercicio />,
    },
    {
        path: "/sesiones",
        element: <Sesiones />,
    },
    {
        path: "/lineasSesion",
        element: <LineasSesion />,
    },
    {
        path: "/rm",
        element: <Rm />,
    },
]);
