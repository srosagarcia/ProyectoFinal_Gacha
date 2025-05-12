package es.cheste.backend.repositorios;

import es.cheste.backend.entidades.PersonajeUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonajeUsuarioRepository extends JpaRepository<PersonajeUsuario, Long> {}

