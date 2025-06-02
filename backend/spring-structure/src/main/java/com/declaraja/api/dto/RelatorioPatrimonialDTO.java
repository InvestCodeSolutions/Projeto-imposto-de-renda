package com.declaraja.api.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class RelatorioPatrimonialDTO {
    private Long usuarioId;
    private String anoReferencia;
    private BigDecimal valorTotal;
    private List<BemDTO> bens;

    public RelatorioPatrimonialDTO(Long usuarioId, String anoReferencia, BigDecimal valorTotal, List<BemDTO> bens) {
        this.usuarioId = usuarioId;
        this.anoReferencia = anoReferencia;
        this.valorTotal = valorTotal;
        this.bens = bens;
    }
}
