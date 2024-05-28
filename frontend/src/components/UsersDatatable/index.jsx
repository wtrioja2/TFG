import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import axiosConfig from "../../config/axios-config";
import DeleteModal from "./DeleteModal";
import FormModal from "./FormModal";

export default function Index() {
  const [users, setUsers] = useState([]);
  const [links, setLinks] = useState([]);
  const [meta, setMeta] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [formMode, setFormMode] = useState("create");
  const [defaultUserData, setDefaultUserData] = useState([]);


  const setPaginatedData = (response) => {
    setUsers(response.data.data);
    setLinks(response.data.links);
    setMeta(response.data.meta);
  };

  const fetchUsers = async (link) => {
    if (link !== null) {
      const response = await axios.get(link, axiosConfig);
      setPaginatedData(response);
    }
  };

  const previousPage = async () => {
    await fetchUsers(links.prev);
  };

  const nextPage = async () => {
    await fetchUsers(links.next);
  };

  const firstPage = async () => {
    await fetchUsers(links.first);
  };

  const lastPage = async () => {
    await fetchUsers(links.last);
  };

  const createUser = () => {
    setShowFormModal(true);
    setFormMode("create");
    setUserId(null);
    setDefaultUserData({});
  };

  const updateUser = (userData) => {
    setShowFormModal(true);
    setFormMode("update");
    setUserId(userData.id);
    setDefaultUserData(userData);
  };

  const deleteUser = (userId) => {
    setShowDeleteModal(true);
    setUserId(userId);
  };
  
  useEffect(() => {
    fetchUsers(`${import.meta.env.VITE_API_URL}/api/v1/users`);
  }, []);

  return (
    <div className="mt-10">
      <button 
        onClick={ createUser} 
        className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full mb-5">
        Añadir Usuario
      </button>
      <table className="table-auto w-full border">
        <thead>
          <tr className="text-left font-medium">
            <th className="px-4 py-2 border border-gray-400">Nombre</th>
            <th className="px-4 py-2 border border-gray-400">Email</th>
            <th className="px-4 py-2 border border-gray-400">Rol</th>
            <th className="px-4 py-2 border border-gray-400">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, key) => (
            <tr key={key} className="text-left">
              <td className="px-4 py-2 border border-gray-400">
                {user.first_name} {user.last_name}
              </td>
              <td className="px-4 py-2 border border-gray-400">{user.email}</td>
              <td className="px-4 py-2 border border-gray-400">{user.rol}</td>
              <td className="px-4 py-2 border border-gray-400">
                <button 
                  onClick={ () => updateUser(user) }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mr-2">
                  Editar
                </button>
                <button
                  onClick={ () => deleteUser(user.id) }
                  className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full mr-2"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        meta={meta}
        fetchUsers={fetchUsers}
        firstPage={firstPage}
        previousPage={previousPage}
        nextPage={nextPage}
        lastPage={lastPage}
      />

      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          userId={userId}
          fetchUsers={fetchUsers}
          meta={meta}
        />
      )}

      {showFormModal && (
        <FormModal
          setShowFormModal={setShowFormModal}
          formMode={formMode}
          userId={userId}
          defaultUserData={defaultUserData}
          fetchUsers={fetchUsers}
          meta={meta}
        />
      )}
    </div>
  );
}
