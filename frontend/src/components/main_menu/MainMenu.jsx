import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainMenu() {
    const navigate = useNavigate();
    return (
        <div className="screen dark">
            <h2 className="title">Menú Principal</h2>
            <div className="button-group">
                <button onClick={() => navigate("/gacha/personajes")}>Banner de Personajes</button>
                <button onClick={() => navigate("/gacha/armas")}>Banner de Armas</button>
                <button onClick={() => navigate("/niveles")}>Modo Historia</button>
            </div>
        </div>
    );
}
