import React, { useState, useEffect } from "react";
import "./GachaPersonajes.css";

export default function GachaPersonajes() {
    const [results, setResults] = useState([]);
    const [animating, setAnimating] = useState(false);
    const [particles, setParticles] = useState([]);

    const getInitialPity = () => {
        const saved = localStorage.getItem("pityPersonajes");
        return saved !== null ? parseInt(saved, 10) : 0;
    };

    const [pullCount, setPullCount] = useState(getInitialPity);

// Cada vez que pullCount cambie, lo guardamos
    useEffect(() => {
        localStorage.setItem("pityPersonajes", pullCount.toString());
    }, [pullCount]);


    const pool = [
        { name: "Castorice", image: "http://localhost:8080/images/personajes/castorice.png", stars: 5 },
        { name: "Acheron", image: "http://localhost:8080/images/personajes/acheron.png", stars: 4 },
        { name: "7 Marzo", image: "http://localhost:8080/images/banner/personajes/7Marzo.png", stars: 3 },
        { name: "Gallagher", image: "http://localhost:8080/images/banner/personajes/gallagher.png", stars: 4 },
        { name: "Dan Heng", image: "http://localhost:8080/images/banner/personajes/dan_heng.png", stars: 3 },
        { name: "Xueyi", image: "http://localhost:8080/images/banner/personajes/xueyi.png", stars: 4 },
        { name: "Firefly", image: "http://localhost:8080/images/banner/personajes/firefly.png", stars: 5 },
    ];

    const pullCharacter = (currentCount) => {
        let stars;
        if (currentCount + 1 >= 50) {
            stars = 5;
        } else {
            const rand = Math.random();
            stars = rand < 0.05 ? 5 : rand < 0.35 ? 4 : 3;
        }

        const candidates = pool.filter(c => c.stars === stars);
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
            const result = pullCharacter(currentPull);
            pulls.push(result);
            currentPull = result.stars === 5 ? 0 : currentPull + 1;
        }

        setPullCount(currentPull);
        animatePull(pulls);
    };

    return (
        <div className="screen dark">
            <img
                src="/images/banner/personajes/bannerCastorice.png"
                alt="Banner de personajes"
                className="banner-image"
            />

            <h2 className="title">Gacha de Personajes</h2>
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
                        <img src={r.image} alt={r.name} />
                        <h3>{r.name}</h3>
                        <p>{"★".repeat(r.stars)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
