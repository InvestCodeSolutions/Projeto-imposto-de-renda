package com.declaraja.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bens")
public class Bem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    @Enumerated(EnumType.STRING)
    @NotNull
    private TipoBem tipo;

    @NotBlank(message = "A descrição do bem é obrigatória")
    private String descricao;

    @NotNull
    @Positive
    private BigDecimal valor;

    @NotBlank(message = "O ano de referência é obrigatório")
    private String anoReferencia;  // <-- novo campo para ano

    @NotBlank
    private String formaAquisicao;

    private String documentoPath;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    public BigDecimal getValor() {
        return this.valor;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public String getTipo() {
        return this.tipo.toString();
    }

    public Long getId() {
        return this.id;
    }

    public String getAnoReferencia() {
        return this.anoReferencia;
    }

    public Long getUsuarioId() {
        return this.usuario.getId();
    }

    public void setDescricao(@NotBlank(message = "A descrição do bem é obrigatória") String descricao) {
        this.descricao = descricao;
    }

    public void setTipo(@NotBlank(message = "O tipo do bem é obrigatório") String tipoStr) {
        if (tipoStr == null || tipoStr.isBlank()) {
            throw new IllegalArgumentException("O tipo do bem é obrigatório");
        }
        try {
            this.tipo = TipoBem.valueOf(tipoStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Tipo inválido: " + tipoStr);
        }
    }

    public void setValor(@NotNull(message = "O valor do bem é obrigatório") BigDecimal valor) {
        this.valor = valor;
    }

    public void setAnoReferencia(String ano) {
        this.anoReferencia = ano;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public void setDocumentoPath(String documentoPath) {
        this.documentoPath = documentoPath;
    }

    public String getDocumentoPath() {
        return this.documentoPath;
    }

    public Usuario getUsuario() {
        return this.usuario;
    }

    public void setNome(String strNome) {
        this.nome = strNome;
    }

    public String getNome() {
        return this.nome;
    }

    public String getFormaAquisicao() {
        return this.formaAquisicao;
    }

    public void setFormaAquisicao(String forma) {
        this.formaAquisicao = forma;
    }

    public enum TipoBem {
        IMOVEL,
        VEICULO,
        APLICACAO_FINANCEIRA,
        CRIPTOMOEDA,
        JOIAS,
        OBRAS_ARTE,
        OUTROS
    }
}