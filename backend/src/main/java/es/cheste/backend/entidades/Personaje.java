package es.cheste.backend.entidades;

import jakarta.persistence.*;

@Entity
public class Personaje {
    @Id
    private String nombre;
    private int vida;
    private int atk;
    private double danoCritico;
    private double probCritica;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getVida() {
        return vida;
    }

    public void setVida(int vida) {
        this.vida = vida;
    }

    public int getAtk() {
        return atk;
    }

    public void setAtk(int atk) {
        this.atk = atk;
    }

    public double getDanoCritico() {
        return danoCritico;
    }

    public void setDanoCritico(double danoCritico) {
        this.danoCritico = danoCritico;
    }

    public double getProbCritica() {
        return probCritica;
    }

    public void setProbCritica(double probCritica) {
        this.probCritica = probCritica;
    }
}
