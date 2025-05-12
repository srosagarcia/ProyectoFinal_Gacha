package es.cheste.backend.controller;

import es.cheste.backend.entidades.ArmaUsuario;
import es.cheste.backend.entidades.PersonajeUsuario;
import es.cheste.backend.entidades.Usuario;
import es.cheste.backend.repositorios.ArmaUsuarioRepository;
import es.cheste.backend.repositorios.PersonajeUsuarioRepository;
import es.cheste.backend.repositorios.UsuarioRepository;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class GachaController {

    private final UsuarioRepository usuarioRepo;
    private final PersonajeUsuarioRepository personajeUsuarioRepo;
    private final ArmaUsuarioRepository armaUsuarioRepo;

    public GachaController(UsuarioRepository usuarioRepo, PersonajeUsuarioRepository personajeUsuarioRepo, ArmaUsuarioRepository armaUsuarioRepo) {
        this.usuarioRepo = usuarioRepo;
        this.personajeUsuarioRepo = personajeUsuarioRepo;
        this.armaUsuarioRepo = armaUsuarioRepo;
    }

    @GetMapping("/usuario/{id}")
    public Usuario getUsuario(@PathVariable Long id) {
        return usuarioRepo.findById(id).orElse(null);
    }

    @PostMapping("/usuario")
    public Usuario createUsuario() {
        Usuario u = new Usuario();
        u.setNumPityArmas(0);
        u.setNumPityPersonaje(0);
        return usuarioRepo.save(u);
    }

    @PostMapping("/usuario/{id}/pity")
    public Usuario updatePity(@PathVariable Long id, @RequestParam int pityPersonaje, @RequestParam int pityArmas) {
        Usuario u = usuarioRepo.findById(id).orElseThrow();
        u.setNumPityPersonaje(pityPersonaje);
        u.setNumPityArmas(pityArmas);
        return usuarioRepo.save(u);
    }

    @PostMapping("/usuario/{id}/personaje")
    public PersonajeUsuario addPersonaje(@PathVariable Long id, @RequestParam String nombre) {
        PersonajeUsuario p = new PersonajeUsuario();
        p.setIdUsuario(id);
        p.setNombrePersonaje(nombre);
        return personajeUsuarioRepo.save(p);
    }

    @PostMapping("/usuario/{id}/arma")
    public ArmaUsuario addArma(@PathVariable Long id, @RequestParam String nombre) {
        ArmaUsuario a = new ArmaUsuario();
        a.setIdUsuario(id);
        a.setNombreArma(nombre);
        return armaUsuarioRepo.save(a);
    }

    @GetMapping("/usuario/{id}/inventario")
    public Map<String, List<String>> getInventario(@PathVariable Long id) {
        List<String> personajes = personajeUsuarioRepo.findAll().stream()
                .filter(p -> p.getIdUsuario().equals(id))
                .map(PersonajeUsuario::getNombrePersonaje)
                .toList();

        List<String> armas = armaUsuarioRepo.findAll().stream()
                .filter(a -> a.getIdUsuario().equals(id))
                .map(ArmaUsuario::getNombreArma)
                .toList();

        return Map.of("personajes", personajes, "armas", armas);
    }
}
