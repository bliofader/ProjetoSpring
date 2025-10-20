package br.com.gymfy.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity(name = "Usuarios")
@Inheritance(strategy = InheritanceType.JOINED)
public class Usuario implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    int id;

    @Column(name = "Nome")
    String nome;

    @Column(name = "Tipo")
    String tipo;

    @Column(name = "Data de nascimento")
    Date dataNascimento;

    @Column(name = "CPF")
    String cpf;

    @Column(name = "Email")
    String email;

    @Column(name = "Senha")
    String senha;


    public Usuario(String nome, String tipo, Date dataNascimento, String cpf, String email, String senha) {
        this.nome = nome;
        this.tipo = tipo;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }

    public Usuario(int id, String nome, String tipo, Date dataNascimento, String cpf, String email, String senha) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }

    public Usuario() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Date getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", tipo='" + tipo + '\'' +
                ", dataNascimento=" + dataNascimento +
                ", cpf='" + cpf + '\'' +
                ", email='" + email + '\'' +
                ", senha='" + senha + '\'' +
                '}';
    }

}
