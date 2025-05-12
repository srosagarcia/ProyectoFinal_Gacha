import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css"; // puedes usar este o incluir en App.css

function NavBar() {
    const navigate = useNavigate();
    const [showBannerMenu, setShowBannerMenu] = useState(false);

    return (
        <nav className="navbar">
            <button className="nav-btn" onClick={() => setShowBannerMenu(!showBannerMenu)}>
                Banner
            </button>
            {showBannerMenu && (
                <div className="dropdown">
                    <button onClick={() => navigate("/gacha/personajes")}>Personajes</button>
                    <button onClick={() => navigate("/gacha/armas")}>Armas</button>
                </div>
            )}
            <button className="nav-btn" onClick={() => navigate("/historia")}>
                Modo Historia
            </button>
        </nav>
    );
}

export default NavBar;