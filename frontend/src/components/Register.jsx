import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
    const [error, setError] = useState(null); // This is the state for the error messages
    const [isRegistered, setIsRegistered] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    /**
     * Handle the register form submission
     *
     * @param {object} e
     */
    const handleRegister = (e) => {
        e.preventDefault();
        const first_name = e.target.first_name.value;
        const last_name = e.target.last_name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const rol = e.target.rol.value

        axios
            .post(`${import.meta.env.VITE_API_URL}/api/v1/register`, {
                first_name,
                last_name,
                email,
                password,
                rol
            })
            .then(() => {
                setError([]);
                setSuccessMessage("Registro realizado con éxito."); 
                setIsRegistered(true);
            })
            .catch((err) => {
                setError(err?.response?.data?.errors);
                setSuccessMessage(null);
            });

            setTimeout(() => {
                setSuccessMessage(null); 
                useEffect(window.location.href = "/login");
            }, 3500);
    };

    /**
     * Redirect the user to the dashboard if logged in
     */
    useEffect(() => {
        if (isRegistered) {      
            window.location.href = "/login";
        }
    }, [isRegistered]);

    return (    
        <form   className="login100-form"
                method="POST"
                onSubmit={handleRegister}
        >

            <span className="login100-form-title p-b-49">
                Crea tu cuenta
            </span>
            
            <div className="input-container">

                <div className="wrap-input50 m-b-23">
                    <span className="label-input100">Nombre</span>
                    <input  className="input100"
                            type="first_name"
                            name="first_name"
                            id="first_name"
                            placeholder="Nombre" />
                    <span   className="focus-input100"></span>
                    <span   className="text-red-500 text-sm">
                            {error?.first_name}
                    </span>
                </div>

                <div className="wrap-input50 m-b-23">
                    <span className="label-input100">Apellidos</span>
                    <input  className="input100"
                            type="last_name"
                            name="last_name"
                            id="last_name"
                            placeholder="Apellidos" />
                    <span   className="focus-input100"></span>
                    <span   className="text-red-500 text-sm">
                            {error?.last_name}
                    </span>
                </div>

            </div>

            

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
            
            <div className="wrap-input100 m-b-23">
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

            <div className="wrap-input100">
                <span className="label-input100">Rol</span>
                <select className="input100" name="rol" id="rol">
                    <option value="atleta" selected>Atleta</option>
                    <option value="entrenador">Entrenador</option>
                </select>
                    <span className="focus-input100"></span>
            </div>
            
            <div className="text-right p-t-8 p-b-31"></div>
            
            <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                    <button className="login100-form-btn"
                            type="submit">
                            Regístrate
                    </button>
                    {successMessage && (
                        <p className="text-green-500 mt-2">{successMessage}</p>
                    )}
                </div>
            </div>
            
            <div className="flex-col-c p-t-60">
                    <span className="txt1 p-b-17">
                        ¿Ya tienes cuenta?
                    </span>
            
                    <a onClick={() => window.location.href = "/login"} className="txt2">
                        Ir a Login
                    </a>
            </div>
    </form>
    );
}