import React from "react";

export default function Inventario() {
    const personajes = [
        { name: "Castorice", image: "/images/Castorice.png", stars: 5 },
        { name: "Acheron", image: "/images/Acheron.png", stars: 4 },
        { name: "7 Marzo", image: "/images/7Marzo.png", stars: 3 },
        { name: "Hilda", image: "/images/hilda.png", stars: 4 },
    ];

    const armas = [
        { name: "Espada", image: "/images/sword.png", stars: 4 },
        { name: "Arco", image: "/images/bow.png", stars: 3 },
        { name: "Lanza", image: "/images/spear.png", stars: 5 },
    ];

    return (
        <div className="screen dark">
            <h2 className="title">Inventario</h2>
            <h3>Personajes</h3>
            <div className="grid">
                {personajes.map((p) => (
                    <div className="card" key={p.name}>
                        <img src={p.image} alt={p.name} />
                        <h4>{p.name}</h4>
                        <p>{"★".repeat(p.stars)}</p>
                    </div>
                ))}
            </div>
            <h3>Armas</h3>
            <div className="grid">
                {armas.map((a) => (
                    <div className="card" key={a.name}>
                        <img src={a.image} alt={a.name} />
                        <h4>{a.name}</h4>
                        <p>{"★".repeat(a.stars)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
