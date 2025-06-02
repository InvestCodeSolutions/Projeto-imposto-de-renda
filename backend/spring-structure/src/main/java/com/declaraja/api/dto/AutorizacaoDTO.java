package com.declaraja.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AutorizacaoDTO {

    @NotNull(message = "O ID do contador é obrigatório")
    private Long contadorId;

    @NotNull(message = "O ID do usuário é obrigatório")
    private Long usuarioId;

    public Long getContadorId() {
        return this.contadorId;
    }
}
