package com.declaraja.api.repository;

import com.declaraja.api.model.Autorizacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AutorizacaoRepository extends JpaRepository<Autorizacao, Long> {
    List<Autorizacao> findByClienteId(Long clienteId);
    List<Autorizacao> findByContadorId(Long contadorId);
    Optional<Autorizacao> findByClienteIdAndContadorId(Long clienteId, Long contadorId);
    List<Autorizacao> findByContadorIdAndStatus(Long contadorId, Autorizacao.StatusAutorizacao status);
}