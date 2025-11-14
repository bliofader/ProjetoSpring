package br.com.gymfy.DTO;

import br.com.gymfy.entities.Lista;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class ListaResponseDTO {
    private int id;
    private String nome;
    private String descricao;
    private Date data;
    private String dia;
    private String usuarioNome;
    private List<ExercicioDTO> exercicios; // ✅ lista de objetos

    public ListaResponseDTO(Lista lista) {
        this.id = lista.getId();
        this.nome = lista.getNome();
        this.descricao = lista.getDescricao();
        this.data = lista.getData();
        this.dia = lista.getDia();
        this.usuarioNome = lista.getUsuario().getNome();
        this.exercicios = lista.getExercicios()
                .stream()
                .map(ExercicioDTO::new)
                .collect(Collectors.toList());
    }

    // Getters
    public int getId() { return id; }
    public String getNome() { return nome; }
    public String getDescricao() { return descricao; }
    public Date getData() { return data; }
    public String getDia() { return dia; }
    public String getUsuarioNome() { return usuarioNome; }
    public List<ExercicioDTO> getExercicios() { return exercicios; }
}
