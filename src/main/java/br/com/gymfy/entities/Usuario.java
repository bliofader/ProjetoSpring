package br.com.gymfy.entities;

import jakarta.persistence.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity(name = "Usuarios")
@Inheritance(strategy = InheritanceType.JOINED)
public class Usuario implements Serializable, UserDetails {
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

    @Column(name = "Email", unique = true)
    String email;

    @Column(name = "Senha")
    String senha;

    @Column(name = "Sobrenome")
    String sobrenome;

    @Column(name = "CEP")
    String cep;


    public Usuario(String nome, String tipo, Date dataNascimento, String cpf, String email, String senha, String sobrenome, String cep) {
        this.nome = nome;
        this.tipo = tipo;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.sobrenome = sobrenome;
        this.cep = cep;
    }


    public Usuario(int id, String nome, String tipo, Date dataNascimento, String cpf, String email, String senha, String sobrenome, String cep) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.sobrenome = sobrenome;
        this.cep = cep;
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

    public String getSobrenome() { return sobrenome; }
    public void setSobrenome(String sobrenome) { this.sobrenome = sobrenome; }
    public String getCep() { return cep; }
    public void setCep(String cep) { this.cep = cep; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + tipo.toUpperCase()));
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }


    @Override
    public boolean isEnabled() {
        return true;
    }


    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
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
                ", sobrenome='" + sobrenome + '\'' +
                ", cep='" + cep + '\'' +
                '}';
    }

}
