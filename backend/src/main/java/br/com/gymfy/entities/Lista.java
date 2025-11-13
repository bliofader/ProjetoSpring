package br.com.gymfy.entities;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity(name = "Listas")
public class Lista implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "Nome")
    private String nome;

    @Column(name = "Descricao")
    private String descricao;

    @Column(name = "Data")
    private Date data;

    @Column(name = "Dia")
    private String dia;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToMany
    @JoinTable(
            name = "lista_exercicios",
            joinColumns = @JoinColumn(name = "lista_id"),
            inverseJoinColumns = @JoinColumn(name = "exercicio_id")
    )
    private List<Exercicio> exercicios = new ArrayList<>();

    // 🔧 Construtores
    public Lista() {}

    public Lista(int id, String nome, String descricao, Date data, String dia) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.data = data;
        this.dia = dia;
    }

    public Lista(String nome, String descricao, Date data, String dia) {
        this.nome = nome;
        this.descricao = descricao;
        this.data = data;
        this.dia = dia;
    }

    public Lista(String nome, Date data, String dia) {
        this.nome = nome;
        this.data = data;
        this.dia = dia;
    }

    // 🔧 Getters e Setters
    public int getId() {
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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
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

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<Exercicio> getExercicios() {
        return exercicios;
    }

    public void setExercicios(List<Exercicio> exercicios) {
        this.exercicios = exercicios;
    }

    // 🔧 toString
    @Override
    public String toString() {
        return "Lista{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", descricao='" + descricao + '\'' +
                ", data=" + data +
                ", dia='" + dia + '\'' +
                ", usuario=" + (usuario != null ? usuario.getId() : "null") +
                ", exercicios=" + exercicios +
                '}';
    }
}
