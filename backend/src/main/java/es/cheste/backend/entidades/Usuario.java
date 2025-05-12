package es.cheste.backend.entidades;

import jakarta.persistence.*;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int numPityPersonaje;
    private int numPityArmas;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNumPityPersonaje() {
        return numPityPersonaje;
    }

    public void setNumPityPersonaje(int numPityPersonaje) {
        this.numPityPersonaje = numPityPersonaje;
    }

    public int getNumPityArmas() {
        return numPityArmas;
    }

    public void setNumPityArmas(int numPityArmas) {
        this.numPityArmas = numPityArmas;
    }
}