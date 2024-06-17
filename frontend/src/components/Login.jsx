import React, { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import "./Login.css";

const Login = () => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoading } = useLogin();

    const PinoySingAdmin = JSON.parse(localStorage.getItem("PinoySingAdmin"));

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
        window.location.reload();
    }

    return (
        <div className="login-container">
            <form className="login" onSubmit={handleSubmit} name="login">
                <h2>Login</h2>
                <label>Username:</label>
                <input
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    value={username}
                />
                <label>Password:</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                />
                <button disabled={isLoading}>Login</button>
                {error && <div>{error}</div>}
            </form>
        </div>
    )
}

export default Login;