package br.com.gymfy.DTO;

import br.com.gymfy.validadores.CPFValido;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class UsuarioCadastroDTO {

    @NotBlank(message = "O nome é obrigatório.")
    @Size(max = 60, message = "O nome deve ter no máximo 60 caracteres.")
    private String nome;

    @NotBlank(message = "O tipo de usuário é obrigatório.")
    private String tipo; // "Comum" ou "Personal"

    @PastOrPresent(message = "A data de nascimento não pode ser futura.")
    private LocalDate dataNascimento;

    @NotBlank(message = "O CPF é obrigatório.")
    @CPFValido
    private String cpf;

    @NotBlank(message = "O e-mail é obrigatório.")
    @Email(message = "Formato de e-mail inválido.")
    @Size(max = 50, message = "O e-mail deve ter no máximo 50 caracteres.")
    private String email;

    @NotBlank(message = "A senha é obrigatória.")
    @Size(min = 6, max = 40, message = "A senha deve ter entre 6 e 40 caracteres.")
    private String senha;

    // ✅ Campos extras para Personal
    @Size(max = 60, message = "A especialidade deve ter no máximo 60 caracteres.")
    private String especialidade;

    @Size(max = 300, message = "A descrição deve ter no máximo 300 caracteres.")
    private String descricao; // ✅ corrigido

    @Size(max = 80, message = "A rede social deve ter no máximo 80 caracteres.")
    private String redeSocial;

    public UsuarioCadastroDTO() {}

    public UsuarioCadastroDTO(String nome, String tipo, LocalDate dataNascimento, String cpf,
                              String email, String senha,
                              String especialidade, String descricao, String redeSocial) {
        this.nome = nome;
        this.tipo = tipo;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.especialidade = especialidade;
        this.descricao = descricao;
        this.redeSocial = redeSocial;
    }

    // Getters e setters
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public LocalDate getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(LocalDate dataNascimento) { this.dataNascimento = dataNascimento; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public String getEspecialidade() { return especialidade; }
    public void setEspecialidade(String especialidade) { this.especialidade = especialidade; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getRedeSocial() { return redeSocial; }
    public void setRedeSocial(String redeSocial) { this.redeSocial = redeSocial; }
}
