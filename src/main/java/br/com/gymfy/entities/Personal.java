package br.com.gymfy.entities;
import jakarta.persistence.*;
import java.util.Date;

@Entity(name = "Personais")
public class Personal extends Usuario {
    @Column(name = "Especialidade")
    String especialidade;

    @Column(name = "Descrição")
    String descricão;

    @Column(name = "Rede_Social")
    String redeSocial;

    public Personal(){
    }
    public Personal(String nome, String tipo, Date dataNascimento, String cpf, String email, String senha, String especialidade, String descricão, String redeSocial) {
        super(nome, tipo, dataNascimento, cpf, email, senha,redeSocial);
        this.especialidade = especialidade;
        this.descricão = descricão;
        this.redeSocial = redeSocial;
    }

    public Personal(int id,String nome, String tipo, Date dataNascimento, String cpf, String email, String senha, String especialidade, String descricão, String redeSocial) {
        super(id,nome, tipo, dataNascimento, cpf, email, senha,redeSocial);
        this.especialidade = especialidade;
        this.descricão = descricão;
        this.redeSocial = redeSocial;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public String getDescricão() {
        return descricão;
    }

    public void setDescricão(String descricão) {
        this.descricão = descricão;
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
                ", descricâo='" + descricão + '\'' +
                ", redeSocial='" + redeSocial + '\'' +
                '}';
    }
}
