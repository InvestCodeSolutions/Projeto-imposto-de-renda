package com.declaraja.api.service;

import com.declaraja.api.dto.UsuarioRegistroDTO;
import com.declaraja.api.exception.ResourceNotFoundException;
import com.declaraja.api.model.Usuario;
import com.declaraja.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public Usuario criarUsuario(UsuarioRegistroDTO registroDTO) {
        if (usuarioRepository.existsByEmail(registroDTO.getEmail())) {
            throw new IllegalArgumentException("Email já está em uso");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(registroDTO.getNome());
        usuario.setEmail(registroDTO.getEmail());
        usuario.setSenha(passwordEncoder.encode(registroDTO.getSenha()));
        usuario.setTipo(registroDTO.getTipo());
        usuario.setAtivo(true);

        return usuarioRepository.save(usuario);
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + id));
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com email: " + email));
    }

    public void desativarUsuario(Long id) {
        Usuario usuario = buscarPorId(id);
        usuario.setAtivo(false);
        usuarioRepository.save(usuario);
    }

}