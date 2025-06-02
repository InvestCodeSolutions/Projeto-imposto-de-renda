package com.declaraja.api.controller;

import com.declaraja.api.dto.BemDTO;
import com.declaraja.api.model.Bem;
import com.declaraja.api.model.Usuario;
import com.declaraja.api.service.BemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/bens")
@RequiredArgsConstructor
@Tag(name = "Bens", description = "Endpoints para gerenciamento de bens")
@SecurityRequirement(name = "bearerAuth")
public class BemController {

    private final BemService bemService;

    public BemController() {
        bemService = null;
    }

    @GetMapping
    @Operation(summary = "Listar bens", description = "Lista todos os bens do usuário autenticado")
    public ResponseEntity<Page<Bem>> listarBens(
            @AuthenticationPrincipal Usuario usuario,
            Pageable pageable) {
        Page<Bem> bens = bemService.listarBensPorUsuario(usuario.getId(), pageable, usuario.getId());
        return ResponseEntity.ok(bens);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar bem", description = "Busca um bem específico pelo ID")
    public ResponseEntity<Bem> buscarBem(
            @PathVariable Long id,
            @AuthenticationPrincipal Usuario usuario) {
        Bem bem = bemService.buscarBem(id, usuario.getId());
        return ResponseEntity.ok(bem);
    }

    @GetMapping("/tipo/{tipo}")
    @Operation(summary = "Buscar bens por tipo", description = "Busca bens por tipo")
    public ResponseEntity<List<Bem>> buscarBensPorTipo(
            @PathVariable Bem.TipoBem tipo,
            @AuthenticationPrincipal Usuario usuario) {
        List<Bem> bens = bemService.buscarBensPorTipo(usuario.getId(), tipo, usuario.getId());
        return ResponseEntity.ok(bens);
    }

    @GetMapping("/periodo")
    @Operation(summary = "Buscar bens por período", description = "Busca bens por período de aquisição")
    public ResponseEntity<List<Bem>> buscarBensPorPeriodo(
            @RequestParam String inicio,
            @RequestParam String fim,
            @AuthenticationPrincipal Usuario usuario) {
        List<Bem> bens = bemService.buscarBensPorPeriodo(usuario.getId(), inicio, fim, usuario.getId());
        return ResponseEntity.ok(bens);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Criar bem", description = "Cria um novo bem para o usuário autenticado")
    public ResponseEntity<Bem> criarBem(
            @Valid @RequestPart("bem") BemDTO bemDTO,
            @RequestPart(value = "documento", required = false) MultipartFile documento,
            @AuthenticationPrincipal Usuario usuario) throws IOException {
        Bem bem = bemService.criarBem(bemDTO.toBem(), usuario.getId(), documento);
        return ResponseEntity.status(HttpStatus.CREATED).body(bem);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Atualizar bem", description = "Atualiza um bem existente")
    public ResponseEntity<Bem> atualizarBem(
            @PathVariable Long id,
            @Valid @RequestPart("bem") BemDTO bemDTO,
            @RequestPart(value = "documento", required = false) MultipartFile documento,
            @AuthenticationPrincipal Usuario usuario) throws IOException {
        // Verificar se o bem pertence ao usuário antes de atualizar
        bemService.buscarBem(id, usuario.getId());
        Bem bem = bemService.atualizarBem(id, bemDTO.toBem(), documento);
        return ResponseEntity.ok(bem);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar bem", description = "Deleta um bem existente")
    public ResponseEntity<Void> deletarBem(
            @PathVariable Long id,
            @AuthenticationPrincipal Usuario usuario) throws IOException {
        // Verificar se o bem pertence ao usuário antes de deletar
        bemService.buscarBem(id, usuario.getId());
        bemService.deletarBem(id);
        return ResponseEntity.noContent().build();
    }
}