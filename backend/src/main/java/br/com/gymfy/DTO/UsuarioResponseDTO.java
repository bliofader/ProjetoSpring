package br.com.gymfy.DTO;

import br.com.gymfy.entities.Usuario;
import br.com.gymfy.entities.Personal;
import java.text.SimpleDateFormat;

public class UsuarioResponseDTO {
    private Integer id;
    private String nome;
    private String email;
    private String tipo;
    private String dataNascimento;
    private String cpf;
    private String imagem; // URL completa

    // Campos extras para Personal
    private String especialidade;
    private String descricao; // ✅ corrigido sem acento
    private String redeSocial;

    public UsuarioResponseDTO() {}

    public UsuarioResponseDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.tipo = usuario.getTipo();
        this.cpf = usuario.getCpf();

        // ✅ Monta a URL completa da imagem
        if (usuario.getImagem() != null) {
            this.imagem = "http://localhost:8080/uploads/" + usuario.getImagem();
        } else {
            this.imagem = null;
        }

        // ✅ Formata a data de nascimento como yyyy-MM-dd
        if (usuario.getDataNascimento() != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            this.dataNascimento = sdf.format(usuario.getDataNascimento());
        } else {
            this.dataNascimento = null;
        }

        // ✅ Se for Personal, popula os campos extras
        if (usuario instanceof Personal personal) {
            this.especialidade = personal.getEspecialidade();
            this.descricao = personal.getDescricao(); // corrigido
            this.redeSocial = personal.getRedeSocial();
        }
    }

    // Getters e setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(String dataNascimento) { this.dataNascimento = dataNascimento; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getImagem() { return imagem; }
    public void setImagem(String imagem) { this.imagem = imagem; }

    public String getEspecialidade() { return especialidade; }
    public void setEspecialidade(String especialidade) { this.especialidade = especialidade; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getRedeSocial() { return redeSocial; }
    public void setRedeSocial(String redeSocial) { this.redeSocial = redeSocial; }
}
