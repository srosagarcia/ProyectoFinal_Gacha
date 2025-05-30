// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/layout/Layout.jsx";
import MainMenu from "./components/main_menu/MainMenu.jsx";
import GachaPersonajes from "./components/gacha/gacha_personajes/GachaPersonajes.jsx";
import GachaArmas from "./components/gacha/gacha_armas/GachaArmas.jsx";
import Historia from "./components/modo_historia/Combate.jsx";
import NivelSelector from "./components/selector_niveles/NivelSelector.jsx";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<MainMenu />} />
                    <Route path="/gacha/personajes" element={<GachaPersonajes />} />
                    <Route path="/gacha/armas" element={<GachaArmas />} />
                    <Route path="/historia" element={<Historia />} />
                    <Route path="/niveles" element={<NivelSelector />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
