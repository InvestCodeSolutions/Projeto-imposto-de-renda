package com.declaraja.api.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class RefreshTokenDTO {

    @NotBlank(message = "O refresh token é obrigatório")
    private String refreshToken;

    public String getRefreshToken() {
        return this.refreshToken;
    }
}
