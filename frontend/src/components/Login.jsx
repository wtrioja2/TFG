import { useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
  const [error, setError] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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

        const user = res.data.user;

        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
        setUser(user);
      })
      .catch((err) => {
        setError(err?.response?.data?.errors);
      });
  };

  /**
   * Redirect the user to the dashboard if logged in
   */
  useEffect(() => {
    if (isLoggedIn && user) {
      switch (user.rol) {
        case "admin":
          window.location.href = "/dashboard";
          break;
        case "entrenador":
          window.location.href = "/dashboard";
          break;
        case "atleta":
          axios
            .get(`${import.meta.env.VITE_API_URL}/api/v1/atletas/indexByUserId?user_id=${user.id}`)
            .then((response) => {
              const atletaData = response.data.data;
              localStorage.setItem("atleta_id", atletaData.id);
              localStorage.setItem("apodo", atletaData.apodo);
              localStorage.setItem("entrenador_id", atletaData.entrenador_id);

              window.location.href = "/dashboard";
            })
            .catch((error) => {
              console.error("Error al obtener los datos del atleta:", error);
            });
          break;
        default:
          break;
      }
    }
  }, [isLoggedIn, user]);

  return (
    <form className="login100-form" method="POST" onSubmit={handleLogin}>
      <span className="login100-form-title p-b-49">Login</span>

      <div className="wrap-input100 m-b-23">
        <span className="label-input100">Correo</span>
        <input
          className="input100"
          type="email"
          name="email"
          id="email"
          placeholder="Correo electrónico"
        />
        <span className="focus-input100"></span>
        <span className="text-red-500 text-sm">{error?.email}</span>
      </div>

      <div className="wrap-input100">
        <span className="label-input100">Contraseña</span>
        <input
          className="input100"
          type="password"
          name="password"
          id="password"
          placeholder="Ingrese su contraseña"
        />
        <span className="focus-input100"></span>
        <span className="text-red-500 text-sm">{error?.password}</span>
      </div>

      <div className="text-right p-t-8 p-b-31"></div>

      <div className="container-login100-form-btn">
        <div className="wrap-login100-form-btn">
          <div className="login100-form-bgbtn"></div>
          <button className="login100-form-btn" type="submit">
            Login
          </button>
        </div>
      </div>

      <div className="flex-col-c p-t-60">
        <span className="txt1 p-b-17">¿No tienes cuenta?</span>

        <a
          onClick={() => (window.location.href = "/register")}
          className="txt2"
        >
          Crea una aquí
        </a>
      </div>
    </form>
  );
}
