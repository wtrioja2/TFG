import React, { useState } from "react";
import axios from "axios";
import axiosConfig from "../../config/axios-config";

export default function FormModal({
  setShowFormModal,
  formMode,
  userId,
  defaultUserData,
  fetchUsers,
  meta,
}) {
  const [email, setEmail] = useState(defaultUserData?.email);
  const [password, setPassword] = useState(defaultUserData?.password);
  const [first_name, setFirstname] = useState(defaultUserData?.first_name);
  const [last_name, setLastName] = useState(defaultUserData?.last_name);
  const [rol, setRol] = useState(defaultUserData?.rol);

  const refreshValues = () => {
    setEmail(null);
    setPassword(null);
    setFirstname(null);
    setLastName(null);
    setRol("atleta");
  };

  /**
   * Create the user
   *
   * @param object userData
   */
  const handleCreateUser = (userData) => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/`,
        userData,
        axiosConfig
      )
      .then((response) => {
        setShowFormModal(false);
        refreshValues();
      })
      .finally(() => {
        fetchUsers(
          `${import.meta.env.VITE_API_URL}/api/v1/users?page=${
            meta.current_page
          }`
        );
      });
  };

  /**
   * Update the user
   *
   * @param object userData
   */

  const handleUpdateUser = (userData) => {
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/v1/users/${userId}`,
        userData,
        axiosConfig
      )
      .then((response) => {
        setShowFormModal(false);
      })
      .finally(() => {
        fetchUsers(
          `${import.meta.env.VITE_API_URL}/api/v1/users?page=${
            meta.current_page
          }`
        );
      });
  };

  /**
   * Handle the form submission
   *
   * @param object e
   */
  const handSubmit = (e) => {
    e.preventDefault();

    // Check if the form is on create or edit mode
    if (formMode === "create") {
      // Create the user
      handleCreateUser({
        email,
        password,
        first_name,
        last_name,
        rol,
      });
      // Update the user
    } else {
      handleUpdateUser({
        email,
        password,
        first_name,
        last_name,
        rol,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "first_name":
        setFirstname(value);
        break;
      case "last_name":
        setLastName(value);
        break;
      case "rol":
        setRol(value);
        break;
    }
  };

  return (
    <div className="bg-gray-500 bg-opacity-20 h-full w-full fixed top-0 left-0 text-gray-600">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white w-[800px] mx-auto rounded-lg shadow-lg p-6">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">
              {formMode === "create" ? "Crear " : "Actualizar "} Usuario{" "}
            </h1>
            {/* close button */}
            <button onClick={() => setShowFormModal(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handSubmit}>
            <div className="flex flex-col mb-4">
              <label
                className="text-gray-700 font-medium mb-2"
                htmlFor="first-name"
              >
                Nombre
              </label>
              <input
                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                type="text"
                id="first-name"
                name="first_name"
                value={first_name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                className="text-gray-700 font-medium mb-2"
                htmlFor="last-name"
              >
                Apellidos
              </label>
              <input
                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                type="text"
                id="last-name"
                name="last_name"
                value={last_name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                type="email"
                id="email"
                name="email"
                value={email || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                className="text-gray-700 font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                type="password"
                id="password"
                name="password"
                value={password || ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-gray-700 font-medium mb-2" htmlFor="rol">
                Rol
              </label>
              <select
                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                id="rol"
                name="rol"
                value={rol}
                onChange={handleChange}
              >
                <option value="atleta">Atleta</option>
                <option value="entrenador">Entrenador</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
