package br.com.gymfy.DTO;

public class TokenResponseDTO {
    private String token;
    private String tipo = "Bearer";

    private String perfil;

    public TokenResponseDTO(){}

    public TokenResponseDTO(String token, String perfil){
        this.token = token;
        this.perfil = perfil;
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
}