package br.com.gymfy.DTO;

import jakarta.validation.constraints.NotBlank;

public class PersonalCadastroDTO extends UsuarioCadastroDTO{

    @NotBlank(message = "A especialidade é obrigatória.")
    private String especialidade;

    @NotBlank(message = "A descrição é obrigatória.")
    private String descricao;

    @NotBlank(message = "A rede social é obrigatória.")
    private String redeSocial;

    public PersonalCadastroDTO() {}

    public PersonalCadastroDTO(String email, String senha, String nome, String sobrenome, String cep, String cpf, String dataNascimento, String especialidade, String descricao, String redeSocial) {

        super(email, senha, nome, sobrenome, cep, cpf, dataNascimento);

        this.especialidade = especialidade;
        this.descricao = descricao;
        this.redeSocial = redeSocial;
    }

    public String getEspecialidade() { return especialidade; }
    public void setEspecialidade(String especialidade) { this.especialidade = especialidade; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getRedeSocial() { return redeSocial; }
    public void setRedeSocial(String redeSocial) { this.redeSocial = redeSocial; }
}
