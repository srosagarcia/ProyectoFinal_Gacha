package es.cheste.backend.service;

import es.cheste.backend.model.Personaje;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CombateService {

    private List<Personaje> jugadores = new ArrayList<>();
    private List<Personaje> enemigos = new ArrayList<>();
    private List<Personaje> ordenTurnos = new ArrayList<>();
    private int turnoActual = 0;
    private String resultadoCombate = null;

    public CombateService() {
        iniciarCombate();
    }

    public void iniciarCombate() {
        jugadores = new ArrayList<>(List.of(
                new Personaje("Castorice", 100, 100, 20, 90, 0, "jugador"),
                new Personaje("Acheron", 120, 120, 15, 80, 0, "jugador")
        ));
        enemigos = new ArrayList<>(List.of(
                new Personaje("Espada-bajo", 120, 120, 10, 50, 0, "enemigo"),
                new Personaje("Maza-bajo", 100, 100, 15, 60, 0, "enemigo")
        ));

        ordenTurnos = new ArrayList<>();
        ordenTurnos.addAll(jugadores);
        ordenTurnos.addAll(enemigos);
        ordenTurnos.sort(Comparator.comparingInt(Personaje::getVelocidad).reversed());

        turnoActual = 0;
        resultadoCombate = null;
    }

    public Personaje getPersonajeActual() {
        if (ordenTurnos == null || ordenTurnos.isEmpty()) {
            return null;
        }
        int index = turnoActual % ordenTurnos.size();
        if (index < 0 || index >= ordenTurnos.size()) {
            return null;
        }
        return ordenTurnos.get(index);
    }

    public Map<String, Object> getEstado() {
        Personaje personajeActual = getPersonajeActual();

        Map<String, Object> estado = new HashMap<>();
        estado.put("jugadores", jugadores);
        estado.put("enemigos", enemigos);
        estado.put("personajeActual", personajeActual); // puede ser null, frontend debe manejarlo
        estado.put("turnoActual", turnoActual);
        estado.put("resultado", resultadoCombate);

        return estado;
    }

    public Map<String, Object> realizarAtaque(String tipo, String nombreObjetivo) {
        Personaje atacante = getPersonajeActual();
        if (atacante == null || atacante.getVida() <= 0) {
            return Map.of("error", "No es turno válido");
        }

        Optional<Personaje> optObjetivo = ordenTurnos.stream()
                .filter(p -> p.getNombre().equals(nombreObjetivo) && p.getVida() > 0)
                .findFirst();

        if (optObjetivo.isEmpty()) {
            return Map.of("error", "Objetivo no válido");
        }

        Personaje objetivo = optObjetivo.get();

        int daño = 0;
        switch (tipo) {
            case "normal" -> {
                daño = (int)(atacante.getAtk()*1.25);
                atacante.setEnergia(Math.min(atacante.getEnergia() + 20, 100));
            }
            case "cargado" -> {
                daño = (int)(atacante.getAtk()*1.5);
                atacante.setEnergia(Math.min(atacante.getEnergia() + 30, 100));
            }
            case "ultimate" -> {
                if (atacante.getEnergia() < 100) {
                    return Map.of("error", "Energía insuficiente para ultimate");
                }
                daño = (int)(atacante.getAtk()*2);
                atacante.setEnergia(atacante.getEnergia() - 100);
            }
            default -> {
                return Map.of("error", "Tipo de ataque no válido");
            }
        }

        objetivo.setVida(Math.max(objetivo.getVida() - daño, 0));

        avanzarTurno();
        comprobarResultado();

        return Map.of(
                "objetivo", objetivo.getNombre(),
                "danio", daño
        );
    }

    private void avanzarTurno() {
        turnoActual = (turnoActual + 1) % ordenTurnos.size();
        // Saltar personajes muertos
        while (getPersonajeActual() != null && getPersonajeActual().getVida() <= 0) {
            turnoActual = (turnoActual + 1) % ordenTurnos.size();
        }
    }

    private void comprobarResultado() {
        boolean jugadoresVivos = jugadores.stream().anyMatch(p -> p.getVida() > 0);
        boolean enemigosVivos = enemigos.stream().anyMatch(p -> p.getVida() > 0);

        if (!jugadoresVivos) {
            resultadoCombate = "derrota";
        } else if (!enemigosVivos) {
            resultadoCombate = "victoria";
        } else {
            resultadoCombate = null;
        }
    }

    public void reiniciarPartida() {
        iniciarCombate();
    }

}
