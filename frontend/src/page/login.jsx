import React from "react";
import Login from "../components/Login";
import background from "../assets/images/bg-01.jpg"

export default function login() {
    return (

        <div className="limiter">
            <div className="container-login100" style={{ backgroundImage: `url(${background})` }} >
            <div className="wrap-login100 p-l-45 p-r-45 p-t-55 p-b-45" style={{ transform: "scale(0.85)" }}>

        
                    <Login />
        
                </div>
            </div>
        </div>
    );
}
