package com.declaraja.api.repository;

import com.declaraja.api.model.Bem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BemRepository extends JpaRepository<Bem, Long> {

    // Página de bens por usuário
    Page<Bem> findByUsuario_Id(Long usuarioId, Pageable pageable);

    // Lista bens por usuário e tipo
    List<Bem> findByUsuario_IdAndTipo(Long usuarioId, Bem.TipoBem tipo);

    // Lista bens por usuário e ano de referência exato
    List<Bem> findByUsuario_IdAndAnoReferencia(Long usuarioId, String anoReferencia);

    // Lista bens por usuário dentro de um intervalo de anos
    List<Bem> findByUsuario_IdAndAnoReferenciaBetween(Long usuarioId, String startAno, String endAno);

    // Lista todos os bens do usuário
    List<Bem> findByUsuario_Id(Long usuarioId);
}
