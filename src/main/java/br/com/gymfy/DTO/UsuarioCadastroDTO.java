package br.com.gymfy.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;

public class UsuarioCadastroDTO {

    @NotBlank(message = "O email é obrigatório.")
    @Email(message = "Formato de email inválido.")
    private String email;

    @NotBlank(message = "A senha é obrigatória.")
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres.")
    private String senha;

    @NotBlank(message = "O nome é obrigatório.")
    private String nome;

    @NotBlank(message = "O sobrenome é obrigatório.")
    private String sobrenome;

    @NotBlank(message = "O CEP é obrigatório.")
    private String cep;

    @NotBlank(message = "O CPF é obrigatório.")
    @CPF(message = "O CPF é inválido.")
    private String cpf;

    @NotBlank(message = "A data de nascimento é obrigatória.")
    private String dataNascimento;

    public UsuarioCadastroDTO() {}

    public UsuarioCadastroDTO(String email, String senha, String nome, String sobrenome, String cep, String cpf, String dataNascimento) {
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cep = cep;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
    }

    public String getEmail() { return email; }
    public String getSenha() { return senha; }
    public String getNome() { return nome; }
    public String getSobrenome() { return sobrenome; }
    public String getCep() { return cep; }
    public String getCpf() { return cpf; }
    public String getDataNascimento() { return dataNascimento; }

    public void setEmail(String email) { this.email = email; }
    public void setSenha(String senha) { this.senha = senha; }
    public void setNome(String nome) { this.nome = nome; }
    public void setSobrenome(String sobrenome) { this.sobrenome = sobrenome; }
    public void setCep(String cep) { this.cep = cep; }
    public void setCpf(String cpf) { this.cpf = cpf; }


    public void setDataNascimento(String dataNascimento) { this.dataNascimento = dataNascimento; }
}