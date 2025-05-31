import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NivelSelector.css";

export default function NivelSelector() {
    /**
     * Función encargada de actualizar el boolean de cargando mientras la barra de progresión no
     * haya sido ompletada.
     */
    const [cargando, setCargando] = useState(true);


    /**
     * Función encargada de la navegación entre pantallas.
     *
     * @type {NavigateFunction} Pantalla a la que quieres navegar.
     */
    const navigate = useNavigate();


    /**
     * Hook de React que carga la barra de progresión en el temporizador marcado,
     * al acabar este temporizador cambia el boolean de cargado a false.
     */
    useEffect(() => {
        const timer = setTimeout(() => {
            setCargando(false);
        }, 2500);
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
