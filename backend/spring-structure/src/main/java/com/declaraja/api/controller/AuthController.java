package com.declaraja.api.controller;

import com.declaraja.api.dto.JwtResponseDTO;
import com.declaraja.api.dto.LoginDTO;
import com.declaraja.api.dto.RefreshTokenDTO;
import com.declaraja.api.dto.UsuarioRegistroDTO;
import com.declaraja.api.model.Usuario;
import com.declaraja.api.security.JwtTokenProvider;
import com.declaraja.api.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticação", description = "Endpoints para autenticação de usuários")
@Slf4j
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UsuarioService usuarioService;

    @PostMapping("/login")
    @Operation(summary = "Autenticar usuário", description = "Autentica um usuário com email e senha")
    public ResponseEntity<JwtResponseDTO> autenticarUsuario(@Valid @RequestBody LoginDTO loginDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDTO.getEmail(),
                            loginDTO.getSenha()
                    )
            );

            Usuario usuario = usuarioService.buscarPorEmail(loginDTO.getEmail());

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = tokenProvider.generateToken(authentication);
            String refreshToken = tokenProvider.generateRefreshToken(authentication);

            JwtResponseDTO response = new JwtResponseDTO();
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setEmail(usuario.getEmail());
            response.setNome(usuario.getNome());

            log.info("Usuário autenticado com sucesso: {}", usuario.getEmail());

            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            log.warn("Tentativa de login inválida para email: {}", loginDTO.getEmail());
            throw new BadCredentialsException("Email ou senha inválidos.");
        }
    }

    @PostMapping("/register")
    @Operation(summary = "Registrar usuário", description = "Registra um novo usuário no sistema")
    public ResponseEntity<Usuario> registrarUsuario(@Valid @RequestBody UsuarioRegistroDTO registroDTO) {
        Usuario usuario = usuarioService.criarUsuario(registroDTO);
        log.info("Novo usuário registrado: {}", usuario.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }

    @PostMapping("/refresh-token")
    @Operation(summary = "Atualizar token", description = "Atualiza o token JWT usando um refresh token")
    public ResponseEntity<JwtResponseDTO> refreshToken(@RequestBody RefreshTokenDTO refreshTokenDTO) {
        if (!tokenProvider.validateToken(refreshTokenDTO.getRefreshToken())) {
            log.warn("Refresh token inválido.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = tokenProvider.getUsernameFromToken(refreshTokenDTO.getRefreshToken());
        Usuario usuario = usuarioService.buscarPorEmail(username);

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                usuario.getEmail(), null, List.of(new SimpleGrantedAuthority("ROLE_" + usuario.getTipo()))
        );

        String jwt = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);

        JwtResponseDTO response = new JwtResponseDTO();
        response.setToken(jwt);
        response.setRefreshToken(refreshToken);
        response.setEmail(usuario.getEmail());
        response.setNome(usuario.getNome());

        log.info("Refresh token gerado para: {}", usuario.getEmail());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    @Operation(summary = "Dados do usuário logado", description = "Retorna os dados do usuário autenticado")
    public ResponseEntity<Usuario> getUsuarioLogado(Principal principal) {
        String email = principal.getName();
        Usuario usuario = usuarioService.buscarPorEmail(email);
        return ResponseEntity.ok(usuario);
    }
}
