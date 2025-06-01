package com.declaraja.api.controller;

import com.declaraja.api.dto.JwtResponseDTO;
import com.declaraja.api.dto.LoginDTO;
import com.declaraja.api.dto.TwoFactorVerifyDTO;
import com.declaraja.api.dto.UsuarioRegistroDTO;
import com.declaraja.api.model.Usuario;
import com.declaraja.api.security.JwtTokenProvider;
import com.declaraja.api.service.TwoFactorAuthService;
import com.declaraja.api.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticação", description = "Endpoints para autenticação de usuários")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UsuarioService usuarioService;
    private final TwoFactorAuthService twoFactorAuthService;

    @PostMapping("/login")
    @Operation(summary = "Autenticar usuário", description = "Autentica um usuário com email e senha")
    public ResponseEntity<JwtResponseDTO> autenticarUsuario(@Valid @RequestBody LoginDTO loginDTO) {
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
        
        if (usuario.isUsing2FA()) {
            response.setRequires2FA(true);
            response.setQrCodeUrl(twoFactorAuthService.getQRCodeUrl(usuario.getEmail()));
            response.setToken(null); // Não enviar token real até 2FA ser verificado
        } else {
            response.setRequires2FA(false);
        }
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-2fa")
    @Operation(summary = "Verificar código 2FA", description = "Verifica o código de autenticação de dois fatores")
    public ResponseEntity<JwtResponseDTO> verificar2FA(@Valid @RequestBody TwoFactorVerifyDTO verifyDTO) {
        boolean isValid = twoFactorAuthService.verifyCode(verifyDTO.getEmail(), verifyDTO.getCode());
        
        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        Usuario usuario = usuarioService.buscarPorEmail(verifyDTO.getEmail());
        
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                usuario.getEmail(), null, List.of(new SimpleGrantedAuthority("ROLE_" + usuario.getTipo()))
        );
        
        String jwt = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);
        
        JwtResponseDTO response = new JwtResponseDTO();
        response.setToken(jwt);
        response.setRefreshToken(refreshToken);
        response.setRequires2FA(false);
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    @Operation(summary = "Registrar usuário", description = "Registra um novo usuário no sistema")
    public ResponseEntity<Usuario> registrarUsuario(@Valid @RequestBody UsuarioRegistroDTO registroDTO) {
        Usuario usuario = usuarioService.criarUsuario(registroDTO);
        
        JwtResponseDTO response = new JwtResponseDTO();
        if (usuario.isUsing2FA()) {
            response.setRequires2FA(true);
            response.setQrCodeUrl(twoFactorAuthService.getQRCodeUrl(usuario.getEmail()));
        }
        
        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }

    @PostMapping("/refresh-token")
    @Operation(summary = "Atualizar token", description = "Atualiza o token JWT usando um refresh token")
    public ResponseEntity<JwtResponseDTO> refreshToken(@RequestBody RefreshTokenDTO refreshTokenDTO) {
        if (!tokenProvider.validateToken(refreshTokenDTO.getRefreshToken())) {
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
        response.setRequires2FA(false);
        
        return ResponseEntity.ok(response);
    }
}