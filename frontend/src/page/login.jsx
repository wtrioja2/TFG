import React from "react";
import Login from "../components/Login";
import background from "../assets/images/bg-01.jpg"

export default function login() {
    return (

        <div className="limiter">
            <div className="container-login100" style={{ backgroundImage: `url(${background})` }} >
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
        
                    <Login />
        
                </div>
            </div>
        </div>
    );
}
