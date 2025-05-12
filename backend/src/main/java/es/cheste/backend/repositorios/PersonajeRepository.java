package es.cheste.backend.repositorios;

import es.cheste.backend.entidades.Personaje;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonajeRepository extends JpaRepository<Personaje, String> {}

