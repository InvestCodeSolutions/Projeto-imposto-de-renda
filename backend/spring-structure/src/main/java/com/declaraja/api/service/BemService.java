package com.declaraja.api.service;

import com.declaraja.api.exception.ResourceNotFoundException;
import com.declaraja.api.model.Bem;
import com.declaraja.api.model.Usuario;
import com.declaraja.api.repository.BemRepository;
import com.declaraja.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BemService {

    private final BemRepository bemRepository;
    private final UsuarioRepository usuarioRepository;
    private final AutorizacaoService autorizacaoService;

    @Value("${app.file-storage.bens}")
    private String bemUploadDir;

    public Bem criarBem(Bem bem, Long usuarioId, MultipartFile documento) throws IOException {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + usuarioId));

        bem.setUsuario(usuario);

        if (bem.getAnoReferencia() == null || bem.getAnoReferencia().isBlank()) {
            throw new IllegalArgumentException("Ano de referência é obrigatório");
        }

        if (documento != null && !documento.isEmpty()) {
            String documentoPath = salvarDocumento(documento);
            bem.setDocumentoPath(documentoPath);
        }

        return bemRepository.save(bem);
    }

    public Bem atualizarBem(Long bemId, Bem bemAtualizado, MultipartFile documento) throws IOException {
        Bem bem = bemRepository.findById(bemId)
                .orElseThrow(() -> new ResourceNotFoundException("Bem não encontrado com ID: " + bemId));

        bem.setNome(bemAtualizado.getNome());
        bem.setTipo(bemAtualizado.getTipo());
        bem.setDescricao(bemAtualizado.getDescricao());
        bem.setValor(bemAtualizado.getValor());
        bem.setAnoReferencia(bemAtualizado.getAnoReferencia());
        bem.setFormaAquisicao(bemAtualizado.getFormaAquisicao());

        if (documento != null && !documento.isEmpty()) {
            if (bem.getDocumentoPath() != null) {
                Path path = Paths.get(bem.getDocumentoPath());
                Files.deleteIfExists(path);
            }

            String documentoPath = salvarDocumento(documento);
            bem.setDocumentoPath(documentoPath);
        }

        return bemRepository.save(bem);
    }

    public void deletarBem(Long bemId) throws IOException {
        Bem bem = bemRepository.findById(bemId)
                .orElseThrow(() -> new ResourceNotFoundException("Bem não encontrado com ID: " + bemId));

        if (bem.getDocumentoPath() != null) {
            Path path = Paths.get(bem.getDocumentoPath());
            Files.deleteIfExists(path);
        }

        bemRepository.delete(bem);
    }

    public Bem buscarBem(Long bemId, Long usuarioId) {
        Bem bem = bemRepository.findById(bemId)
                .orElseThrow(() -> new ResourceNotFoundException("Bem não encontrado com ID: " + bemId));

        if (bem.getUsuario().getId().equals(usuarioId) ||
                autorizacaoService.verificarAutorizacao(bem.getUsuario().getId(), usuarioId)) {
            return bem;
        }

        throw new SecurityException("Acesso não autorizado ao bem");
    }

    public Page<Bem> listarBensPorUsuario(Long usuarioId, Pageable pageable, Long solicitanteId) {
        if (usuarioId.equals(solicitanteId) ||
                autorizacaoService.verificarAutorizacao(usuarioId, solicitanteId)) {
            return bemRepository.findByUsuario_Id(usuarioId, pageable);
        }

        throw new SecurityException("Acesso não autorizado aos bens do usuário");
    }

    public List<Bem> buscarBensPorTipo(Long usuarioId, Bem.TipoBem tipo, Long solicitanteId) {
        if (usuarioId.equals(solicitanteId) ||
                autorizacaoService.verificarAutorizacao(usuarioId, solicitanteId)) {
            return bemRepository.findByUsuario_IdAndTipo(usuarioId, tipo);
        }

        throw new SecurityException("Acesso não autorizado aos bens do usuário");
    }

    public List<Bem> buscarBensPorAnoReferencia(Long usuarioId, String anoReferencia, Long solicitanteId) {
        if (usuarioId.equals(solicitanteId) ||
                autorizacaoService.verificarAutorizacao(usuarioId, solicitanteId)) {
            return bemRepository.findByUsuario_IdAndAnoReferencia(usuarioId, anoReferencia);
        }

        throw new SecurityException("Acesso não autorizado aos bens do usuário");
    }

    private String salvarDocumento(MultipartFile documento) throws IOException {
        Path uploadPath = Paths.get(bemUploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String nomeArquivo = UUID.randomUUID().toString() + "_" + documento.getOriginalFilename();
        Path filePath = uploadPath.resolve(nomeArquivo);

        Files.copy(documento.getInputStream(), filePath);

        return filePath.toString();
    }

    public List<Bem> buscarBensPorPeriodo(Long usuarioId, String inicio, String fim, Long solicitanteId) {
        // Verifica se o solicitante é o próprio usuário ou possui autorização
        if (usuarioId.equals(solicitanteId) || autorizacaoService.verificarAutorizacao(usuarioId, solicitanteId)) {
            // Buscar bens do usuário entre as datas informadas
            return bemRepository.findByUsuario_IdAndAnoReferenciaBetween(usuarioId, inicio, fim);
        }

        throw new SecurityException("Acesso não autorizado aos bens do usuário");
    }
}
