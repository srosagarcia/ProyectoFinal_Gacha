import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NivelSelector.css";

export default function NivelSelector() {
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setCargando(false);
        }, 2500); // Simula la carga durante 2.5 segundos
        return () => clearTimeout(timer);
    }, []);

    if (cargando) {
        return (
            <div className="selector-container loading">
                <div className="barra-carga">
                    <div className="progreso"></div>
                </div>
                <p className="mensaje-carga">🔍 Buscando niveles disponibles...</p>
            </div>
        );
    }

    return (
        <div className="selector-container">
            <h1 className="titulo-niveles">Selecciona un Mundo</h1>
            <div className="niveles-grid">
                <button className="nivel-boton desbloqueado" onClick={() => navigate("/historia")}>
                    🌍 Mundo 1
                </button>
                <button className="nivel-boton bloqueado" disabled>
                    🔒 Mundo 2
                </button>
                <button className="nivel-boton bloqueado" disabled>
                    🔒 Mundo 3
                </button>
                <button className="nivel-boton bloqueado" disabled>
                    🔒 Mundo 4
                </button>
            </div>
        </div>
    );
}
