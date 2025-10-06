package br.com.gymfy.entities;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity(name = "Exercicios")
public class Exercicio implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    int id;

    @Column(name = "Nome")
    String nome;

    @Column(name = "Tipo")
    String tipo;

    @Column(name = "Agrupamento")
    String agrupamento;

    @Column(name = "Nivel")
    String nivel;

    @Column(name = "Descrição")
    String descricao;

    public Exercicio(int id, String nome, String tipo, String agrupamento, String nivel, String descricao) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.agrupamento = agrupamento;
        this.nivel = nivel;
        this.descricao = descricao;
    }

    public Exercicio(String nome, String tipo, String agrupamento, String nivel, String descricao) {
        this.nome = nome;
        this.tipo = tipo;
        this.agrupamento = agrupamento;
        this.nivel = nivel;
        this.descricao = descricao;
    }

    public Exercicio() {
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

    public String getAgrupamento() {
        return agrupamento;
    }

    public void setAgrupamento(String agrupamento) {
        this.agrupamento = agrupamento;
    }

    public String getNivel() {
        return nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public String toString() {
        return "Exercicio{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", tipo='" + tipo + '\'' +
                ", agrupamento='" + agrupamento + '\'' +
                ", nivel='" + nivel + '\'' +
                ", descricao='" + descricao + '\'' +
                '}';
    }
}
