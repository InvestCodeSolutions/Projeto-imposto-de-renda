package com.declaraja.api.dto;

import com.declaraja.api.model.Bem;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@Builder
public class BemDTO {

    private Long id;

    @NotBlank(message = "A descrição do bem é obrigatória")
    private String descricao;

    @NotBlank(message = "O tipo do bem é obrigatório")
    private String tipo;

    @NotNull(message = "O valor do bem é obrigatório")
    private BigDecimal valor;

    @NotBlank(message = "O ano de referência é obrigatório")
    private String anoReferencia;

    @NotNull(message = "O ID do usuário é obrigatório")
    private Long usuarioId;

    public BemDTO(Long id, String descricao, String tipo, BigDecimal valor, String anoReferencia, Long usuarioId) {
        this.id = id;
        this.descricao = descricao;
        this.tipo = tipo;
        this.valor = valor;
        this.anoReferencia = anoReferencia;
        this.usuarioId = usuarioId;
    }

    // Getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public BigDecimal getValor() { return valor; }
    public void setValor(BigDecimal valor) { this.valor = valor; }

    public String getAnoReferencia() { return anoReferencia; }
    public void setAnoReferencia(String anoReferencia) { this.anoReferencia = anoReferencia; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public Bem toBem() {
        Bem bem = new Bem();
        bem.setDescricao(this.descricao);
        bem.setTipo(this.tipo);
        bem.setValor(this.valor);
        bem.setAnoReferencia(this.anoReferencia);
        return bem;
    }

}
