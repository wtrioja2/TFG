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
        
        <form   className="login100-form"
                method="POST"
                onSubmit={handleLogin}
        >
    
            <span className="login100-form-title p-b-49">
                Login
            </span>
            
            <div className="wrap-input100 m-b-23">
                <span className="label-input100">Correo</span>
                <input  className="input100"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Correo electrónico" />
                <span   className="focus-input100"></span>
                <span   className="text-red-500 text-sm">
                        {error?.email}
                </span>
            </div>
            
            <div className="wrap-input100">
                <span className="label-input100">Contraseña</span>
                <input  className="input100"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Ingrese su contraseña" />
                    <span className="focus-input100"></span>
                    <span className="text-red-500 text-sm">
                        {error?.password}
                    </span>
            </div>
            
            <div className="text-right p-t-8 p-b-31"></div>
            
            <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                    <button className="login100-form-btn"
                            type="submit">
                            Login
                    </button>
                </div>
            </div>
            
            <div className="flex-col-c p-t-60">
                    <span className="txt1 p-b-17">
                          ¿No tienes cuenta?
                    </span>
            
                    <a onClick={() => window.location.href = "/register"} className="txt2">
                          Crea una aquí
                    </a>
            </div>
        </form>
        
    );
}