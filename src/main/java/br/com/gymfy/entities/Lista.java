package br.com.gymfy.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity(name = "Listas")
public class Lista implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    int id;

    @Column(name = "Nome")
    String nome;

    @Column(name = "Data")
    Date data;

    @Column(name = "Dia")
    String dia;

    public Lista(int id, String nome, Date data, String dia) {
        this.id = id;
        this.nome = nome;
        this.data = data;
        this.dia = dia;
    }

    public Lista(String nome, Date data, String dia) {
        this.nome = nome;
        this.data = data;
        this.dia = dia;
    }

    public Lista() {
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

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

    @Override
    public String toString() {
        return "Lista{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", data=" + data +
                ", dia='" + dia + '\'' +
                '}';
    }
}
