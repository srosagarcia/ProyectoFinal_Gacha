import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainMenu.css";

export default function MainMenu() {
    const navigate = useNavigate();
    return (
        <div className="bg">
            <h2 className="titulo-inicio">Menú Principal</h2>
            <div className="grupo-botones">
                <button className={"botones-inicio"} onClick={() => navigate("/gacha/personajes")}>Banner de Personajes</button>
                <button className={"botones-inicio"} onClick={() => navigate("/gacha/armas")}>Banner de Armas</button>
                <button className={"botones-inicio"} onClick={() => navigate("/niveles")}>Modo Historia</button>
            </div>
        </div>
    );
}
