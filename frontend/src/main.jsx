import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import routerAuthenticated from "./routes/authenticated";
import routerUnauthenticated from "./routes/unauthenticated";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <RouterProvider
    router={
      localStorage.getItem("access_token")
        ? routerAuthenticated
        : routerUnauthenticated
    }
  />
);