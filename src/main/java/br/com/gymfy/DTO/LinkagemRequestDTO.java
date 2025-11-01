package br.com.gymfy.DTO;

import jakarta.validation.constraints.NotNull;

public class LinkagemRequestDTO {

    @NotNull(message = "O ID do Personal é obrigatório.")
    private Integer personalId;

    @NotNull(message = "O ID do Usuário é obrigatório.")
    private Integer usuarioId;



    public Integer getPersonalId() { return personalId; }
    public void setPersonalId(Integer personalId) { this.personalId = personalId; }

    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }
}