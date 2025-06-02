package com.declaraja.api.controller;

import com.declaraja.api.dto.AutorizacaoDTO;
import com.declaraja.api.model.Autorizacao;
import com.declaraja.api.model.Usuario;
import com.declaraja.api.service.AutorizacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contador")
@RequiredArgsConstructor
@Tag(name = "Contador", description = "Endpoints para funcionalidades do contador")
@SecurityRequirement(name = "bearerAuth")
public class ContadorController {

    private final AutorizacaoService autorizacaoService;

    public ContadorController() {
        autorizacaoService = null;
    }

    @GetMapping("/clientes")
    @Operation(summary = "Listar clientes", description = "Lista todos os clientes autorizados do contador")
    @PreAuthorize("hasRole('CONTADOR')")
    public ResponseEntity<List<Usuario>> listarClientesAutorizados(@AuthenticationPrincipal Usuario contador) {
        List<Usuario> clientes = autorizacaoService.listarClientesAutorizados(contador.getId());
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/solicitacoes")
    @Operation(summary = "Listar solicitações", description = "Lista todas as solicitações de autorização pendentes")
    @PreAuthorize("hasRole('CONTADOR')")
    public ResponseEntity<List<Autorizacao>> listarSolicitacoesPendentes(@AuthenticationPrincipal Usuario contador) {
        List<Autorizacao> solicitacoes = autorizacaoService.listarSolicitacoesPendentes(contador.getId());
        return ResponseEntity.ok(solicitacoes);
    }

    @PostMapping("/autorizar-cliente")
    @Operation(summary = "Solicitar autorização", description = "Cliente solicita autorização para um contador")
    public ResponseEntity<Autorizacao> solicitarAutorizacao(
            @Valid @RequestBody AutorizacaoDTO autorizacaoDTO,
            @AuthenticationPrincipal Usuario cliente) {
        Autorizacao autorizacao = autorizacaoService.solicitarAutorizacao(
                cliente.getId(), autorizacaoDTO.getContadorId());
        return ResponseEntity.status(HttpStatus.CREATED).body(autorizacao);
    }

    @PutMapping("/autorizar-cliente/{id}/aprovar")
    @Operation(summary = "Aprovar solicitação", description = "Contador aprova solicitação de autorização")
    @PreAuthorize("hasRole('CONTADOR')")
    public ResponseEntity<Autorizacao> aprovarSolicitacao(
            @PathVariable Long id,
            @AuthenticationPrincipal Usuario contador) {
        Autorizacao autorizacao = autorizacaoService.aprovarSolicitacao(id, contador.getId());
        return ResponseEntity.ok(autorizacao);
    }

    @PutMapping("/autorizar-cliente/{id}/rejeitar")
    @Operation(summary = "Rejeitar solicitação", description = "Contador rejeita solicitação de autorização")
    @PreAuthorize("hasRole('CONTADOR')")
    public ResponseEntity<Autorizacao> rejeitarSolicitacao(
            @PathVariable Long id,
            @AuthenticationPrincipal Usuario contador) {
        Autorizacao autorizacao = autorizacaoService.rejeitarSolicitacao(id, contador.getId());
        return ResponseEntity.ok(autorizacao);
    }
}