package com.declaraja.api.repository;

import com.declaraja.api.model.Bem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BemRepository extends JpaRepository<Bem, Long> {
    Page<Bem> findByUsuarioId(Long usuarioId, Pageable pageable);
    List<Bem> findByUsuarioIdAndTipo(Long usuarioId, Bem.TipoBem tipo);
    List<Bem> findByUsuarioIdAndDataAquisicaoBetween(Long usuarioId, LocalDate inicio, LocalDate fim);
}