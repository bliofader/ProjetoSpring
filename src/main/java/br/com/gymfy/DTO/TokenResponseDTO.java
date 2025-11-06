package br.com.gymfy.DTO;

public class TokenResponseDTO {
    private String token;
    private String tipo = "Bearer";
    private String nome;
    private String perfil;

    public TokenResponseDTO(){}

    public TokenResponseDTO(String token, String perfil, String nome){
        this.token = token;
        this.perfil = perfil;
        this.nome = nome;
    }

    public String getToken() {
        return token;
    }

    public String getTipo() {
        return tipo;
    }
    public String getNome() {
        return nome;
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
    public void setNome(String tipo) {
        this.tipo = nome;
    }

    public void setPerfil(String perfil) {
        this.perfil = perfil;
    }
}