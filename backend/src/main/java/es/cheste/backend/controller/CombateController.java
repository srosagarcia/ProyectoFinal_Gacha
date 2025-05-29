package es.cheste.backend.controller;

import es.cheste.backend.service.CombateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/combate")
@CrossOrigin(origins = "http://localhost:5173") // Vite dev server
public class CombateController {

    @Autowired
    private CombateService combateService;

    @GetMapping("/estado")
    public ResponseEntity<Map<String, Object>> estado() {
        return ResponseEntity.ok(combateService.getEstado());
    }

    @PostMapping("/ataque")
    public ResponseEntity<Map<String, Object>> ataque(@RequestBody Map<String, String> payload) {
        String tipo = payload.get("tipo");
        String objetivo = payload.get("objetivo");
        return ResponseEntity.ok(combateService.realizarAtaque(tipo, objetivo));
    }

    @PostMapping("/reiniciar")
    public ResponseEntity<Void> reiniciar() {
        combateService.reiniciarPartida();
        return ResponseEntity.ok().build();
    }
}
