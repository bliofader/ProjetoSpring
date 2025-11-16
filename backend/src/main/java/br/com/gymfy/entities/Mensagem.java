package br.com.gymfy.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mensagens")
public class Mensagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long idUsuario;   // usuário comum que envia
    private Long idPersonal;  // personal que recebe

    @Column(nullable = false, length = 1000)
    private String conteudo;

    private LocalDateTime dataEnvio = LocalDateTime.now();

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Long idUsuario) { this.idUsuario = idUsuario; }

    public Long getIdPersonal() { return idPersonal; }
    public void setIdPersonal(Long idPersonal) { this.idPersonal = idPersonal; }

    public String getConteudo() { return conteudo; }
    public void setConteudo(String conteudo) { this.conteudo = conteudo; }

    public LocalDateTime getDataEnvio() { return dataEnvio; }
    public void setDataEnvio(LocalDateTime dataEnvio) { this.dataEnvio = dataEnvio; }
}
