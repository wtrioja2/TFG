import { createBrowserRouter } from "react-router-dom";
import Login from "../page/login";
import Register from "../page/register"

export default createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    }
]);
