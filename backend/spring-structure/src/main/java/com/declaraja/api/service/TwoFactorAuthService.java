package com.declaraja.api.service;

import com.declaraja.api.exception.ResourceNotFoundException;
import com.declaraja.api.model.Usuario;
import com.declaraja.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;

@Service
@RequiredArgsConstructor
@Slf4j
public class TwoFactorAuthService {

    private final UsuarioRepository usuarioRepository;

    @Value("${app.2fa.issuer:DeclaraJa}")
    private String issuer;

    public String generateSecret() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[20];
        random.nextBytes(bytes);
        return Base64.getEncoder().encodeToString(bytes);
    }

    public String getQRCodeUrl(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com email: " + email));

        if (!usuario.isUsing2FA() || usuario.getSecret2FA() == null) {
            throw new IllegalStateException("2FA não está ativado para este usuário");
        }

        // Em uma implementação real, esse seria o URL para a API do Google Authenticator
        // Estamos simplificando aqui para demonstração
        String otpAuthUrl = String.format(
                "otpauth://totp/%s:%s?secret=%s&issuer=%s",
                issuer,
                usuario.getEmail(),
                usuario.getSecret2FA(),
                issuer
        );
        
        // Em um cenário real, você geraria um QR code para este URL
        return otpAuthUrl;
    }

    public boolean verifyCode(String email, String code) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com email: " + email));

        if (!usuario.isUsing2FA() || usuario.getSecret2FA() == null) {
            throw new IllegalStateException("2FA não está ativado para este usuário");
        }

        // Em uma implementação real, você validaria o código usando a biblioteca TOTP
        // Aqui simplificamos para demonstração
        // Por exemplo, usando a biblioteca 'com.warrenstrange:googleauth'
        // return totpAuthenticator.authorize(usuario.getSecret2FA(), Integer.parseInt(code));
        
        // Para este exemplo, vamos aceitar o código "123456" para qualquer usuário
        return "123456".equals(code);
    }
}