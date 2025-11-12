package br.com.gymfy.DTO;

import br.com.gymfy.entities.Usuario;
import java.text.SimpleDateFormat;

public class UsuarioResponseDTO {
    private Integer id;
    private String nome;
    private String email;
    private String tipo;
    private String dataNascimento;
    private String cpf;
    private String imagem;

    public UsuarioResponseDTO() {}

    public UsuarioResponseDTO(Integer id, String nome, String email, String tipo, String dataNascimento, String cpf, String imagem) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.tipo = tipo;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.imagem = imagem;
    }

    public UsuarioResponseDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.tipo = usuario.getTipo();
        this.cpf = usuario.getCpf();
        this.imagem = usuario.getImagem();

        // ✅ Formata a data de nascimento como yyyy-MM-dd
        if (usuario.getDataNascimento() != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            this.dataNascimento = sdf.format(usuario.getDataNascimento());
        } else {
            this.dataNascimento = null;
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
}
