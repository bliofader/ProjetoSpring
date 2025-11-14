package br.com.gymfy.DTO;

import br.com.gymfy.entities.Exercicio;

public class ExercicioDTO {
    private int id;
    private String nome;
    private String tipo;
    private String agrupamento;
    private String nivel;
    private String descricao;
    private String imagePath;
    private String videoUrl;

    public ExercicioDTO(Exercicio exercicio) {
        this.id = exercicio.getId();
        this.nome = exercicio.getNome();
        this.tipo = exercicio.getTipo();
        this.agrupamento = exercicio.getAgrupamento();
        this.nivel = exercicio.getNivel();
        this.descricao = exercicio.getDescricao();
        this.imagePath = exercicio.getImagePath();
        this.videoUrl = exercicio.getVideoPath();
    }

    // Getters
    public int getId() { return id; }
    public String getNome() { return nome; }
    public String getTipo() { return tipo; }
    public String getAgrupamento() { return agrupamento; }
    public String getNivel() { return nivel; }
    public String getDescricao() { return descricao; }
    public String getImagePath() { return imagePath; }
    public String getVideoUrl() { return videoUrl; }
}
