package com.declaraja.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    @Email
    @NotBlank
    @Column(unique = true)
    private String email;

    @NotBlank
    private String senha;

    @Enumerated(EnumType.STRING)
    private TipoUsuario tipo;

    private boolean ativo = true;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Bem> bens = new ArrayList<>();

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DocumentoFiscal> documentosFiscais = new ArrayList<>();

    public String getEmail() {
        return this.email;
    }

    public String getTipo() {
        return String.valueOf(this.tipo);
    }

    public void setAtivo(boolean b) {
        this.ativo = b;
    }

    public void setTipo(TipoUsuario tipo) {
        this.tipo = tipo;
    }

    public void setSenha(String encode) {
        this.senha = encode;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getId() {
        return this.id;
    }

    public String getNome() {
        return this.nome;
    }

    public String getSenha() {
        return this.senha;
    }

    public enum TipoUsuario {
        CLIENTE, CONTADOR
    }
}