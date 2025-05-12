import React, { useState, useEffect } from "react";

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

    const pool = [
        { name: "Espada", image: "/images/sword.png", stars: 4 },
        { name: "Arco", image: "/images/bow.png", stars: 3 },
        { name: "Lanza", image: "/images/spear.png", stars: 5 },
        { name: "Hacha", image: "/images/axe.png", stars: 4 },
        { name: "Cetro", image: "/images/staff.png", stars: 5 },
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

    const animatePull = (pulled, isX10) => {
        setAnimating(true);
        setResults([]);

        const generatedParticles = pulled.map((item, index) => ({
            id: index,
            color: isX10 || item.stars === 5 ? "gold" : item.stars === 4 ? "purple" : "blue",
        }));

        setParticles(generatedParticles);

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
            <h2 className="title">Banner de Armas</h2>
            <p>Pity actual: <strong>{pullCount}</strong> / 50</p>

            <div className="button-group">
                <button className="gacha-btn" onClick={() => handlePull(1)}>Tirada x1</button>
                <button className="gacha-btn" onClick={() => handlePull(10)}>Tirada x10</button>
            </div>

            <div className="animation-area">
                {particles.map(p => (
                    <div key={p.id} className={`particle ${p.color}`}></div>
                ))}
            </div>

            <div className="result-grid">
                {results.map((r, i) => (
                    <div className="card result large-card" key={i}>
                        <img src={r.image} alt={r.name} />
                        <h3>{r.name}</h3>
                        <p>{"★".repeat(r.stars)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GachaArmas;
