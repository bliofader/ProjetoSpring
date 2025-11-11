package br.com.gymfy.DTO;

public class TokenResponseDTO {
    private String token;
    private String tipo = "Bearer"; // tipo do token (fixo)
    private String nomeUsuario;
    private String perfil;          // perfil do usuário (Admin, Comum, Personal)
    private Long usuarioId;

    public TokenResponseDTO() {}


    public String getToken() { return token; }
    public String getTipo() { return tipo; }
    public String getPerfil() { return perfil; }
    public String getNomeUsuario() { return nomeUsuario; }
    public Long getUsuarioId() { return usuarioId; }

    public void setToken(String token) { this.token = token; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public void setPerfil(String perfil) { this.perfil = perfil; }
    public void setNomeUsuario(String nomeUsuario) { this.nomeUsuario = nomeUsuario; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
}
