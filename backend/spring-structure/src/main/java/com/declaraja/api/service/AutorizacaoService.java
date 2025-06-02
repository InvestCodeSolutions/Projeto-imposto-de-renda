package com.declaraja.api.service;

import com.declaraja.api.exception.ResourceNotFoundException;
import com.declaraja.api.model.Autorizacao;
import com.declaraja.api.model.Usuario;
import com.declaraja.api.repository.AutorizacaoRepository;
import com.declaraja.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AutorizacaoService {

    private UsuarioRepository usuarioRepository;
    private AutorizacaoRepository autorizacaoRepository;

    public Usuario validarUsuarioLogado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com email: " + email));
    }

    public void validarPropriedadeDoBem(Long usuarioIdDoBem) {
        Usuario usuarioLogado = validarUsuarioLogado();
        if (!usuarioLogado.getId().equals(usuarioIdDoBem)) {
            throw new SecurityException("Acesso negado: Este bem não pertence ao usuário logado.");
        }
    }

    public List<Usuario> listarClientesAutorizados(Long contadorId) {
        // Buscar todas as autorizações com status APROVADO para o contador
        List<Autorizacao> autorizacoes = autorizacaoRepository.findByContadorIdAndStatus(
                contadorId, Autorizacao.StatusAutorizacao.APROVADO);

        // Extrair os IDs dos clientes autorizados
        List<Long> idsClientes = autorizacoes.stream()
                .map(aut -> aut.getCliente().getId())
                .toList();

        // Buscar os usuários clientes pelos IDs
        return usuarioRepository.findAllById(idsClientes);
    }

    public List<Autorizacao> listarSolicitacoesPendentes(Long contadorId) {
        return autorizacaoRepository.findByContadorIdAndStatus(contadorId, Autorizacao.StatusAutorizacao.PENDENTE);
    }

    public Autorizacao solicitarAutorizacao(Long clienteId, Long contadorId) {
        Usuario cliente = usuarioRepository.findById(clienteId)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado com ID: " + clienteId));

        Usuario contador = usuarioRepository.findById(contadorId)
                .orElseThrow(() -> new ResourceNotFoundException("Contador não encontrado com ID: " + contadorId));

        // Verificar se já existe autorização pendente ou aprovada entre cliente e contador
        boolean existeAutorizacao = autorizacaoRepository.findByClienteIdAndContadorId(clienteId, contadorId)
                .filter(a -> a.getStatus() == Autorizacao.StatusAutorizacao.PENDENTE
                        || a.getStatus() == Autorizacao.StatusAutorizacao.APROVADO)
                .isPresent();

        if (existeAutorizacao) {
            throw new IllegalStateException("Já existe uma autorização pendente ou aprovada para esse contador.");
        }

        // Criar nova autorização com status PENDENTE
        Autorizacao autorizacao = new Autorizacao();
        autorizacao.setCliente(cliente);
        autorizacao.setContador(contador);
        autorizacao.setStatus(Autorizacao.StatusAutorizacao.PENDENTE);

        return autorizacaoRepository.save(autorizacao);
    }

    public Autorizacao aprovarSolicitacao(Long autorizacaoId, Long contadorId) {
        Autorizacao autorizacao = autorizacaoRepository.findById(autorizacaoId)
                .orElseThrow(() -> new ResourceNotFoundException("Autorização não encontrada com ID: " + autorizacaoId));

        // Verifica se o contador é o mesmo que recebeu a autorização
        if (!autorizacao.getContador().getId().equals(contadorId)) {
            throw new SecurityException("Aprovação negada: este contador não tem permissão para aprovar esta solicitação.");
        }

        // Atualiza status para APROVADO
        autorizacao.setStatus(Autorizacao.StatusAutorizacao.APROVADO);

        return autorizacaoRepository.save(autorizacao);
    }

    public Autorizacao rejeitarSolicitacao(Long autorizacaoId, Long contadorId) {
        Autorizacao autorizacao = autorizacaoRepository.findById(autorizacaoId)
                .orElseThrow(() -> new ResourceNotFoundException("Autorização não encontrada com ID: " + autorizacaoId));

        // Verifica se o contador tem permissão para rejeitar esta solicitação
        if (!autorizacao.getContador().getId().equals(contadorId)) {
            throw new SecurityException("Rejeição negada: este contador não tem permissão para rejeitar esta solicitação.");
        }

        // Atualiza o status para REJEITADO
        autorizacao.setStatus(Autorizacao.StatusAutorizacao.REJEITADO);

        return autorizacaoRepository.save(autorizacao);
    }

    public boolean verificarAutorizacao(Long clienteId, Long contadorId) {
        // Busca uma autorização aprovada entre cliente e contador
        return autorizacaoRepository.findByClienteIdAndContadorId(clienteId, contadorId)
                .filter(a -> a.getStatus() == Autorizacao.StatusAutorizacao.APROVADO)
                .isPresent();
    }
}
