package com.declaraja.api.service;

import com.declaraja.api.model.Bem;
import com.declaraja.api.model.Usuario;
import com.declaraja.api.repository.BemRepository;
import com.declaraja.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnaliseService {

    private final BemRepository bemRepository;
    private final AutorizacaoService autorizacaoService;
    private final UsuarioRepository usuarioRepository;

    public AnaliseService() {
        bemRepository = null;
        autorizacaoService = null;
        usuarioRepository = null;
    }

    public BigDecimal calcularValorTotalDosBens(Long usuarioId, String anoReferencia) {
        // Valida se o usuário logado tem acesso a esses dados
        autorizacaoService.validarPropriedadeDoBem(usuarioId);

        List<Bem> bens = bemRepository.findByUsuario_IdAndAnoReferencia(usuarioId, anoReferencia);

        return bens.stream()
                .map(Bem::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public Map<String, Object> analisarInconsistencias(Long usuarioId) {
        Map<String, Object> resultado = new HashMap<>();

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + usuarioId));

        // Buscar todos os bens do usuário
        List<Bem> bens = bemRepository.findByUsuario_Id(usuarioId);

        // Lista de bens com valor negativo
        List<Bem> bensValorNegativo = bens.stream()
                .filter(bem -> bem.getValor() != null && bem.getValor().compareTo(BigDecimal.ZERO) < 0)
                .collect(Collectors.toList());

        // Lista de bens com ano de referência inválido (exemplo: ano nulo ou fora do intervalo esperado)
        List<Bem> bensAnoInvalido = bens.stream()
                .filter(bem -> {
                    try {
                        int ano = Integer.parseInt(bem.getAnoReferencia());
                        return ano < 1900 || ano > LocalDate.now().getYear();
                    } catch (Exception e) {
                        return true; // Se não conseguir converter para número, considera inválido
                    }
                })
                .collect(Collectors.toList());

        // Adicionar resultados ao mapa
        resultado.put("usuario", usuario.getNome());
        resultado.put("totalBens", bens.size());
        resultado.put("bensValorNegativo", bensValorNegativo);
        resultado.put("bensAnoInvalido", bensAnoInvalido);

        // Você pode adicionar outras análises e métricas aqui

        return resultado;
    }
}
