package br.com.gymfy.DTO;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.br.CPF;

public class UsuarioUpdateDTO {
    private String nome;
    private String sobrenome;
    private String cep;

    private String dataNascimento;

    @NotBlank(message = "O CPF é obrigatório.")
    @CPF(message = "O CPF é inválido.")
    private String cpf;

    public UsuarioUpdateDTO() {}

    public UsuarioUpdateDTO(String nome, String sobrenome, String cep, String dataNascimento, String cpf) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cep = cep;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public String getCep() {
        return cep;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
}
