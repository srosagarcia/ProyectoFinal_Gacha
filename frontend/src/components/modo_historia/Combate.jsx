import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Combate.css";

export default function Combate() {
    const [personajes, setPersonajes] = useState([]);
    const [enemigos, setEnemigos] = useState([]);
    const [personajeActual, setPersonajeActual] = useState(null);
    const [turnoActual, setTurnoActual] = useState(0);
    const [objetivoSeleccionado, setObjetivoSeleccionado] = useState(null);
    const [resultadoCombate, setResultadoCombate] = useState(null);
    const [dañoReciente, setDañoReciente] = useState({ nombre: null, cantidad: 0 });


    /**
     * Función encargada de actualizar el estado del frontend con los datos recibidos desde el backend
     *
     * @returns {Promise<void>} La función termina cuando  el estado ya está cargado y actualizado.
     */
    const cargarEstado = async () => {
        //Gestión de la petición al backend
        const res = await axios.get("http://localhost:8080/api/combate/estado");

        //Datos recibidos del backend
        const data = res.data;
        setPersonajes(data.jugadores);
        setEnemigos(data.enemigos);
        setTurnoActual(data.turnoActual);
        setPersonajeActual(data.personajeActual);
        setResultadoCombate(data.resultado);
    };


    /**
     * Función encargada de actualiar la vida con anterioridad para el uso de la barra de vida.
     *
     * @returns {Promise<void>} La función termina cuando el estado de la vida ya esta cargada y actualizada.
     */
    const cargarVida = async () => {
        const res = await axios.get("http://localhost:8080/api/combate/estado");
        const data = res.data;
        setPersonajes(data.jugadores);
        setEnemigos(data.enemigos);
    };


    /**
     * Función encargada de realizar el ataque recibiendo el objetivo del backend y por ultimo
     * aplicar el nuevo estado de los personajes.
     *
     * @param tipo Representa el tipo de ataque a realizar.
     * @param objetivo Representa el objetivo al que va dirigido el ataque.
     * @returns {Promise<void>} La función termina cuando el estado fue cargado y actualizado.
     */
    const hacerAtaque = async (tipo, objetivo = null) => {
        if (!objetivo && objetivoSeleccionado) {
            objetivo = objetivoSeleccionado;
        }
        if (!objetivo) return;

        const res = await axios.post("http://localhost:8080/api/combate/ataque", {
            tipo,
            objetivo: objetivo.nombre,
        });

        if (res.data.error) return;

        setDañoReciente({ nombre: res.data.objetivo, cantidad: res.data.danio });
        console.log("Mostrando daño a", res.data.objetivo, "daño:", res.data.danio);

        setTimeout(() => setDañoReciente({ nombre: null, cantidad: 0 }), 900);
        await cargarVida();
        await new Promise(resolve => setTimeout(resolve, 800));
        await cargarEstado();
    };


    /**
     * Función encargada de reiniciar la partida.
     * @returns {Promise<void>} La función termina cuando el estado fue cargado y actualizado.
     */
    const reiniciarPartida = async () => {
        await axios.post("http://localhost:8080/api/combate/reiniciar");
        await cargarEstado();
    };


    /**
     * Función encargada de la carga y actualización de estado la primera vez que se inicia el programa.
     */
    useEffect(() => {
        cargarEstado();
    }, []);


    /**
     * Función que se encarga de realizar el ataque automático aleatorio del turno enemigo.
     */
    useEffect(() => {
        if (personajeActual?.tipo === "enemigo" && personajeActual.vida > 0) {
            const vivos = personajes.filter(p => p.vida > 0);
            if (vivos.length === 0) return;
            const objetivo = vivos[Math.floor(Math.random() * vivos.length)];
            setTimeout(() => hacerAtaque("normal", objetivo), 2000);
        }
    }, [turnoActual]);

    if (!personajeActual) return <div className="combate-container">Cargando combate...</div>;


    /**
     * Función encargada de combinar las listas de enemigos y personajes para poder ordenarlos por velocidad.
     */
    const ordenTurnos = [...personajes, ...enemigos].sort((a, b) => b.velocidad - a.velocidad);

    return (
        <div className="combate-container">
            <div className="barra-turnos">
                {ordenTurnos.map((p, i) => (
                    <div key={i} className={`turno-item ${i === turnoActual ? "activo" : ""}`}>
                        {p.nombre}
                    </div>
                ))}
            </div>

            <div className="zona-combate">
                {personajeActual.tipo === "enemigo" ? (
                    <>
                        <div className="lado-izquierdo">
                            {personajes.map((p, i) => (
                                <div key={i} className={`personaje-card ${p.vida <= 0 ? 'muerto' : ''}`}>
                                    <img src={p.imagen} alt={p.nombre} className="imagen-personaje"/>
                                    {p.vida <= 0 && <div className="muerto-overlay">☠️</div>}
                                    <h3>{p.nombre}</h3>
                                    <div className="vida-barra">
                                        <div className="vida" style={{width: `${(p.vida / p.vidaMax) * 100}%`}}></div>
                                    </div>
                                    <span className="vida-texto">{p.vida} / {p.vidaMax}</span>
                                    <p>⚡ {p.energia}</p>
                                    {dañoReciente.nombre === p.nombre && (
                                        <div className="daño-flotante">❤️ -{dañoReciente.cantidad}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="lado-derecho">
                            <div className="personaje-card activo">
                                <img src={personajeActual.imagen} alt={personajeActual.nombre}
                                     className="imagen-personaje"/>
                                <h2>{personajeActual.nombre}</h2>
                                <div className="vida-barra">
                                    <div className="vida"
                                         style={{width: `${(personajeActual.vida / personajeActual.vidaMax) * 100}%`}}></div>
                                </div>
                                <span
                                    className="vida-texto-aliado">{personajeActual.vida} / {personajeActual.vidaMax}</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="lado-izquierdo">
                            <div className={`personaje-card activo ${personajeActual.vida <= 0 ? 'muerto' : ''}`}>
                                <img src={personajeActual.imagen} alt={personajeActual.nombre}
                                     className="imagen-personaje"/>
                                {personajeActual.vida <= 0 && <div className="muerto-overlay">☠️</div>}
                                <h2>{personajeActual.nombre}</h2>
                                <div className="vida-barra">
                                    <div className="vida"
                                         style={{width: `${(personajeActual.vida / personajeActual.vidaMax) * 100}%`}}></div>
                                </div>
                                <span
                                    className="vida-texto-aliado">{personajeActual.vida} / {personajeActual.vidaMax}</span>
                                <p>⚡ {personajeActual.energia}</p>
                            </div>
                        </div>
                        <div className="lado-derecho">
                            {enemigos.map((e, i) => (
                                <div
                                    key={i}
                                    className={`personaje-card ${objetivoSeleccionado?.nombre === e.nombre ? "objetivo" : ""} ${e.vida <= 0 ? 'muerto' : ''}`}
                                    onClick={() => {
                                        if (e.vida > 0) setObjetivoSeleccionado(e);
                                    }}
                                >
                                    <img src={e.imagen} alt={e.nombre} className="imagen-personaje"/>
                                    {e.vida <= 0 && <div className="muerto-overlay">☠️</div>}
                                    <h3>{e.nombre}</h3>
                                    <div className="vida-barra">
                                        <div className="vida" style={{width: `${(e.vida / e.vidaMax) * 100}%`}}></div>
                                    </div>
                                    <span className="vida-texto">{e.vida} / {e.vidaMax}</span>
                                    {dañoReciente.nombre === e.nombre && (
                                        <div className="daño-flotante">❤️ -{dañoReciente.cantidad}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {personajeActual.tipo === "jugador" && personajeActual.vida > 0 && (
                <div className="panel-acciones">
                    <button onClick={() => hacerAtaque("normal")}>Ataque normal (+20⚡)</button>
                    <button onClick={() => hacerAtaque("cargado")}>Ataque cargado (+30⚡)</button>
                    <button disabled={personajeActual.energia < 100} onClick={() => hacerAtaque("ultimate")}>
                        Ultimate (-100⚡)
                    </button>
                </div>
            )}

            {resultadoCombate && (
                <div className="overlay-resultado">
                    {resultadoCombate === "victoria" ? "¡Has ganado!" : "Has sido derrotado..."}

                </div>
            )}
            <button className="boton-reiniciar" onClick={reiniciarPartida}>
                <img src="public/images/reset.png" alt="Reiniciar Partida"  className="reiniciar-img"/>
            </button>
        </div>
    );
}
