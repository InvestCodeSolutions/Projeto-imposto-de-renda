package com.declaraja.api.repository;

import com.declaraja.api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);

    // Forma opcional, se quiser
    List<Usuario> findByIdIn(List<Long> ids);
}
