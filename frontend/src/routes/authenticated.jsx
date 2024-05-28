import { createBrowserRouter } from "react-router-dom";
import Users from "../page/users";
import Ejercicios from "../page/ejercicios";
import Planificacion from "../page/planificacion";
import Sesiones from "../page/sesiones";
import Rm from "../page/rm";
import ComposicionCorporal from "../page/composicionCorporal";
import Dashboard  from "../page/dashboard";


export default createBrowserRouter([
    {
        path: '/',
        element:  <Dashboard />,
    },
    {
        path: "/dashboard",
        element:  <Dashboard />,
    },
    {
        path: "/users",
        element: 
                <Users />
    },
    {
        path: "/ejercicios",
        element: 
                <Ejercicios />
    },
    {
        path: "/planificacion",
        element: 
                <Planificacion />
    },
    {
        path: "/sesiones",
        element: 
                <Sesiones />
    },
    {
        path: "/rm",
        element: 
                <Rm />
    },
    {
        path: "/composicionCorporal",
        element: 
                <ComposicionCorporal />
    },
]);
