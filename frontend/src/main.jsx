import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider,} from "react-router-dom";
import "./index.css";
import routerAuthenticated from "./routes/authenticated";
import routerUnauthenticated from "./routes/unauthenticated";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {
            localStorage.getItem("access_token") ? (
                <RouterProvider router={routerAuthenticated} />
            ) : (
                <RouterProvider router={routerUnauthenticated} />
            )
        }
    </React.StrictMode>
);