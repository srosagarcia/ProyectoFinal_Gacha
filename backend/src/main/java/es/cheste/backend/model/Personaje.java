package es.cheste.backend.model;

public class Personaje {
    private String nombre;
    private int vida;
    private int vidaMax;
    private int atk;
    private int velocidad;
    private int energia;
    private String tipo; // "jugador" o "enemigo"
    private String imagen; // ruta de la imagen

    public Personaje(String nombre, int vida, int vidaMax, int atk, int velocidad, int energia, String tipo) {
        this.nombre = nombre;
        this.vida = vida;
        this.vidaMax = vidaMax;
        this.atk = atk;
        this.velocidad = velocidad;
        this.energia = energia;
        this.tipo = tipo;
        this.imagen = generarRutaImagen(nombre, tipo);
    }

    private String generarRutaImagen(String nombre, String tipo) {
        String carpeta = tipo.equals("jugador") ? "personajes" : "enemigos";
        String nombreFormateado = nombre.toLowerCase().replace(" ", "-");
        return "/images/" + carpeta + "/" + nombreFormateado + ".png";
    }

    // Getters y setters

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) {
        this.nombre = nombre;
        this.imagen = generarRutaImagen(nombre, tipo);
    }

    public int getVida() { return vida; }
    public void setVida(int vida) { this.vida = vida; }

    public int getVidaMax() { return vidaMax; }
    public void setVidaMax(int vidaMax) { this.vidaMax = vidaMax; }

    public int getAtk() { return atk; }
    public void setAtk(int atk) { this.atk = atk; }

    public int getVelocidad() { return velocidad; }
    public void setVelocidad(int velocidad) { this.velocidad = velocidad; }

    public int getEnergia() { return energia; }
    public void setEnergia(int energia) { this.energia = energia; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) {
        this.tipo = tipo;
        this.imagen = generarRutaImagen(nombre, tipo);
    }

    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }
}
