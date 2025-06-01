package com.declaraja.api.repository;

import com.declaraja.api.model.DocumentoFiscal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DocumentoFiscalRepository extends JpaRepository<DocumentoFiscal, Long> {
    Page<DocumentoFiscal> findByUsuarioId(Long usuarioId, Pageable pageable);
    List<DocumentoFiscal> findByUsuarioIdAndTipo(Long usuarioId, DocumentoFiscal.TipoDocumento tipo);
    List<DocumentoFiscal> findByUsuarioIdAndDataEnvioBetween(Long usuarioId, LocalDate inicio, LocalDate fim);
}