package es.cheste.backend.entidades;

import jakarta.persistence.*;

@Entity
public class Arma {
    @Id
    private String nombre;
    private int atk;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getAtk() {
        return atk;
    }

    public void setAtk(int atk) {
        this.atk = atk;
    }
}
