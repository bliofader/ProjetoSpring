package br.com.gymfy.DTO;

import java.util.Date;
import java.util.List;

public class ListaDTO {
    private String nome;
    private Date data;
    private String dia;
    private List<Integer> exercicioIds;

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

    public List<Integer> getExercicioIds() {
        return exercicioIds;
    }

    public void setExercicioIds(List<Integer> exercicioIds) {
        this.exercicioIds = exercicioIds;
    }
}