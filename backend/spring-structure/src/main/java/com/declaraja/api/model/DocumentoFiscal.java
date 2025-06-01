package com.declaraja.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "documentos_fiscais")
public class DocumentoFiscal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NotNull
    private TipoDocumento tipo;

    @NotBlank
    private String descricao;

    @NotBlank
    private String arquivoPath;

    @NotNull
    @PastOrPresent
    private LocalDate dataEnvio;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    public enum TipoDocumento {
        COMPROVANTE_RENDIMENTO,
        INFORME_RENDIMENTO_FINANCEIRO,
        NOTA_FISCAL,
        RECIBO_PAGAMENTO,
        COMPROVANTE_PAGAMENTO_PLANO_SAUDE,
        COMPROVANTE_PAGAMENTO_EDUCACAO,
        DOACAO,
        OUTRO
    }
}