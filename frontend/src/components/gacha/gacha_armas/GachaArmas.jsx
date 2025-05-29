import React, { useState, useEffect } from "react";
import "./GachaArmas.css";

function GachaArmas() {
    const getInitialPity = () => {
        const saved = localStorage.getItem("pityArmas");
        return saved !== null ? parseInt(saved, 10) : 0;
    };

    const [results, setResults] = useState([]);
    const [pullCount, setPullCount] = useState(getInitialPity);
    const [animating, setAnimating] = useState(false);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        localStorage.setItem("pityArmas", pullCount.toString());
    }, [pullCount]);

    const root="http://localhost:8080/images/banner/armas/";

    const pool = [
        { name: "Mistsplitter", image: root + "mistsplitter.png", stars: 5 },
        { name: "Aqua Simulacra", image: root + "aqua_simulacra.png", stars: 3 },
        { name: "Báculo de Homa", image: root + "baculo_homa.png", stars: 5 },
        { name: "Favonius", image: root + "codice_favonius.png", stars: 4 },
        { name: "Sacrificio", image: root + "mandoble_sacrificio.png", stars: 3 },
    ];

    const pullItem = (currentCount) => {
        let stars;
        if (currentCount + 1 >= 50) {
            stars = 5;
        } else {
            const rand = Math.random();
            if (rand < 0.05) stars = 5;
            else if (rand < 0.35) stars = 4;
            else stars = 3;
        }

        const candidates = pool.filter(i => i.stars === stars);
        return candidates[Math.floor(Math.random() * candidates.length)];
    };

    const animatePull = (pulled) => {
        setAnimating(true);
        setResults([]);

        let maxRarity = pulled.reduce((max, item) => Math.max(max, item.stars), 3);
        let color = maxRarity === 5 ? "gold" : maxRarity === 4 ? "purple" : "blue";

        setParticles(pulled.map((_, i) => ({ id: i, color })));

        setTimeout(() => {
            setParticles([]);
            setResults(pulled);
            setAnimating(false);
        }, 1500);
    };

    const handlePull = (amount) => {
        if (animating) return;

        const pulls = [];
        let currentPull = pullCount;

        for (let i = 0; i < amount; i++) {
            const result = pullItem(currentPull);
            pulls.push(result);
            currentPull = result.stars === 5 ? 0 : currentPull + 1;
        }

        setPullCount(currentPull);
        animatePull(pulls, amount === 10);
    };

    return (
        <div className="screen dark">
            <img
                src="http://localhost:8080/images/banner/armas/banner_armas.png"
                alt="Banner de armas"
                className="banner-image"
            />

            <h2 className="title">Gacha de Armas</h2>
            <p className={'p'}>Pity actual: <strong>{pullCount}</strong> / 50</p>

            <div className="button-group">
                <button className="gacha-btn" onClick={() => handlePull(1)}>Tirada x1</button>
                <button className="gacha-btn" onClick={() => handlePull(10)}>Tirada x10</button>
            </div>

            <div className={`animation-area ${animating ? "expanded" : "collapsed"}`}>
                {particles.map(p => (
                    <div key={p.id} className={`particle ${p.color}`}></div>
                ))}
            </div>

            <div className="result-grid">
                {results.map((r, i) => (
                    <div className="card result large-card" key={i}>
                        <img src={r.image} alt={r.name}/>
                        <h3>{r.name}</h3>
                        <p>{"★".repeat(r.stars)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GachaArmas;
