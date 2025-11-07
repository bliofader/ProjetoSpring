package br.com.gymfy.DTO;

public class TokenResponseDTO {
    private String token;
    private String tipo = "Bearer";
    private String nomeUsuario;
    private String perfil;

    public TokenResponseDTO(){}

    public TokenResponseDTO(String token, String perfil, String nomeUsuario){
        this.token = token;
        this.perfil = perfil;
        this.nomeUsuario = nomeUsuario;
    }

    public String getToken() {
        return token;
    }

    public String getTipo() {
        return tipo;
    }

    public String getPerfil() {
        return perfil;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setPerfil(String perfil) {
        this.perfil = perfil;
    }
    public String getNome() { return nomeUsuario; }
    public void setNomeUsuario(String nomeUsuario) { this.nomeUsuario = nomeUsuario; }

}