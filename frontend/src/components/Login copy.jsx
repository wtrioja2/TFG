import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
    const [error, setError] = useState([]); // This is the state for the error messages
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRol, setUserRol] = useState(null); // This is the state for the login status

    /**
     * Handle the login form submission
     *
     * @param {object} e
     */
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        axios
            .post(`${import.meta.env.VITE_API_URL}/api/v1/login`, {
                email,
                password,
            })
            .then((res) => {
                setError([]);

                const userRol = res.data.user.rol;

                // Save the token and rol in the local storage
                localStorage.setItem("access_token", res.data.access_token);
                localStorage.setItem("rol", userRol);
                setUserRol(userRol);
                setIsLoggedIn(true);
            })
            .catch((err) => {
                setError(err?.response?.data?.errors);
            });
    };

    /**
     * Redirect the user to the dashboard if logged in
     */
    useEffect(() => {
        //console.log("isLoggedIn changed: ", isLoggedIn);
        if (isLoggedIn) {      

            switch (userRol) {

                case "admin":
                    window.location.href = "/admin-dashboard";
                    break;
                case "entrenador":
                    window.location.href = "/entrenador-dashboard";
                    break;
                case "atleta":
                    window.location.href = "/dashboard";
                    break;
                default:
                    // Manejar el caso donde el rol no sea reconocido
                    break;
            }
        }
    }, [isLoggedIn, userRol]);

    return (    
        <div className="grid h-screen place-items-center text-gray-500">
            <div className="bg-white shadow-lg p-10 w-[500px]">
                <h1 className="text-2xl font-bold">Login Account</h1>
                <form
                    method="POST"
                    onSubmit={handleLogin}
                    className="grid grid-cols-1 gap-2 py-10"
                >
                    <div className="grid grid-cols-1 gap-2">
                        <label
                            htmlFor="email"
                            className="cursor-pointer font-semibold"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email..."
                            className="border px-3 p-2"
                        />
                        <span className="text-red-500 text-sm">
                            {error?.email}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <label
                            htmlFor="password"
                            className="cursor-pointer font-semibold"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password..."
                            className="border px-3 p-2"
                        />
                        <span className="text-red-500 text-sm">
                            {error?.password}
                        </span>
                    </div>
                    <button className="mt-5 bg-blue-700 text-white  py-2 text-center rounded-sm hover:bg-blue-800">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}