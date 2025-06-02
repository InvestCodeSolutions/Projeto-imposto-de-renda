package com.declaraja.api.security;

import com.declaraja.api.model.Usuario;
import com.declaraja.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com email: " + email));

        // Aqui você pode configurar as roles conforme seu atributo tipo
        // Assumindo que getTipo() retorna um enum ou String com o tipo do usuário
        String role = usuario.getTipo() != null ? usuario.getTipo() : "USER";

        return User.builder()
                .username(usuario.getEmail())
                .password(usuario.getSenha())
                .roles(role) // roles precisam ser sem o prefixo "ROLE_"
                .build();
    }
}
