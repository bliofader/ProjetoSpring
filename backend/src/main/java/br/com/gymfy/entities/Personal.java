package br.com.gymfy.entities;

import jakarta.persistence.*;
import java.util.Date;

@Entity(name = "Personais")
public class Personal extends Usuario {

    @Column(name = "Especialidade")
    private String especialidade;

    @Column(name = "Descricao") // ✅ corrigido sem acento
    private String descricao;

    @Column(name = "Rede_Social")
    private String redeSocial;

    public Personal() {
    }

    public Personal(String nome, String tipo, Date dataNascimento, String cpf, String email, String senha,
                    String especialidade, String descricao, String redeSocial, String imagePath) {
        super(nome, tipo, dataNascimento, cpf, email, senha, imagePath);
        this.especialidade = especialidade;
        this.descricao = descricao;
        this.redeSocial = redeSocial;
    }

    public Personal(int id, String nome, String tipo, Date dataNascimento, String cpf, String email, String senha,
                    String especialidade, String descricao, String redeSocial, String imagePath) {
        super(id, nome, tipo, dataNascimento, cpf, email, senha, imagePath);
        this.especialidade = especialidade;
        this.descricao = descricao;
        this.redeSocial = redeSocial;
    }

    // Getters e setters
    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public String getDescricao() { // ✅ corrigido
        return descricao;
    }

    public void setDescricao(String descricao) { // ✅ corrigido
        this.descricao = descricao;
    }

    public String getRedeSocial() {
        return redeSocial;
    }

    public void setRedeSocial(String redeSocial) {
        this.redeSocial = redeSocial;
    }

    @Override
    public String toString() {
        return super.toString() + "Personal{" +
                "especialidade='" + especialidade + '\'' +
                ", descricao='" + descricao + '\'' + // ✅ corrigido
                ", redeSocial='" + redeSocial + '\'' +
                '}';
    }
}
