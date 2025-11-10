package br.com.gymfy.DTO;

public class LoginRequestDTO {
    private String email;
    private String senha;

    public LoginRequestDTO(){}

    public LoginRequestDTO(String email, String senha){
        this.email = email;
        this.senha = senha;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
