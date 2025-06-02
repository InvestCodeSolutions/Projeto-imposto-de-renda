package com.declaraja.api.controller;

import com.declaraja.api.model.Usuario;
import com.declaraja.api.service.AnaliseService;
import com.declaraja.api.service.RelatorioService;
import com.declaraja.api.service.AutorizacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/relatorios")
@RequiredArgsConstructor
@Tag(name = "Relatórios", description = "Endpoints para geração de relatórios")
@SecurityRequirement(name = "bearerAuth")
public class RelatorioController {

    private RelatorioService relatorioService;
    private AnaliseService analiseService;
    private AutorizacaoService autorizacaoService;

    @GetMapping("/cliente/{clienteId}/gerar-pdf")
    @Operation(summary = "Gerar relatório PDF", description = "Gera um relatório PDF com informações do cliente")
    public ResponseEntity<Resource> gerarRelatorioPDF(
            @PathVariable Long clienteId,
            @RequestParam(required = false) Integer ano,
            @AuthenticationPrincipal Usuario usuario) {
        
        // Verificar se o usuário pode acessar os dados do cliente
        if (!usuario.getId().equals(clienteId) && 
            !autorizacaoService.verificarAutorizacao(clienteId, usuario.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        Resource pdfResource = relatorioService.gerarRelatorioPDF(clienteId, ano);
        
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"relatorio.pdf\"")
                .body(pdfResource);
    }

    @GetMapping("/analise/inconsistencias")
    @Operation(summary = "Analisar inconsistências", description = "Analisa possíveis inconsistências nos dados")
    public ResponseEntity<Map<String, Object>> analisarInconsistencias(@AuthenticationPrincipal Usuario usuario) {
        Map<String, Object> inconsistencias = analiseService.analisarInconsistencias(usuario.getId());
        return ResponseEntity.ok(inconsistencias);
    }

    @GetMapping("/dashboard")
    @Operation(summary = "Dashboard", description = "Retorna dados para o dashboard")
    public ResponseEntity<Map<String, Object>> obterDadosDashboard(@AuthenticationPrincipal Usuario usuario) {
        Map<String, Object> dashboard = relatorioService.obterDadosDashboard(usuario.getId());
        return ResponseEntity.ok(dashboard);
    }
}