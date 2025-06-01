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

    private String descricao;

    @NotNull
    @Positive
    private BigDecimal valor;

    @NotNull
    @PastOrPresent
    private LocalDate dataAquisicao;

    @NotBlank
    private String formaAquisicao;

    private String documentoPath;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

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