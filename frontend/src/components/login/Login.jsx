import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.username && form.password) navigate("/menu");
    };

    return (
        <div className="screen dark">
            <h2 className="title">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" name="username" placeholder="Nombre de usuario" onChange={handleChange} />
                <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
                <button type="submit">Entrar</button>
            </form>
            <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
        </div>
    );
}
