import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import axiosConfig from "../../config/axios-config";
import DeleteModal from "./DeleteModal";

export default function index() {
    
    const [users, setUsers] = useState([]);
    const [links, setLinks] = useState([]);
    const [meta, setMeta] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userId, setUserId] = useState(null);

    /**
     * Set the paginated data
     *
     * @param object response
     */
    const setPaginatedData = (response) => {
        setUsers(response.data.data);
        setLinks(response.data.links);
        setMeta(response.data.meta);
    };

    /**
     * Fetch all users
     */
    const fetchUsers = async (link) => {
        if (link !== null) {
            const response = await axios.get(link, axiosConfig);
            setPaginatedData(response);
        }
    };

    /**
     * Handle the previous page
     */
    const previousPage = async () => {
        await fetchUsers(links.prev);
    };

    /**
     * Handle the next page
     */
    const nextPage = async () => {
        await fetchUsers(links.next);
    };

    /**
     * Handle the first page
     */
    const firstPage = async () => {
        await fetchUsers(links.first);
    };

    /**
     * Handle the last page
     */
    const lastPage = async () => {
        await fetchUsers(links.last);
    };

    /**
     * Delete de user
     * 
     * @param int userId 
     */
    const deleteUser = (userId) => {
        setShowDeleteModal(true);
        setUserId(userId);
    }
    useEffect(() => {
        fetchUsers(`${import.meta.env.VITE_API_URL}/api/v1/users`);
    }, []);

    return (
        <div className="mt-10">
            <button className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full mb-5">
                Add User
            </button>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="text-left font-medium">
                        <th className="px-4 py-2 border border-gray-400">
                            Name
                        </th>
                        <th className="px-4 py-2 border border-gray-400">
                            Email
                        </th>
                        <th className="px-4 py-2 border border-gray-400">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) => (
                        <tr key={key} className="text-left">
                            <td className="px-4 py-2 border border-gray-400">
                                {user.first_name} {user.last_name}
                            </td>
                            <td className="px-4 py-2 border border-gray-400">
                                {user.email}
                            </td>
                            <td className="px-4 py-2 border border-gray-400">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mr-2">
                                    Edit
                                </button>
                                <button 
                                onClick={() => deleteUser(user.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full mr-2">
                                    Delete
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

            {showDeleteModal &&  <DeleteModal setShowDeleteModal={setShowDeleteModal} userId={userId} />} 
            
        </div>
    );
}
