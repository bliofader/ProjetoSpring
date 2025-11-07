package br.com.gymfy.services;

import br.com.gymfy.DTO.LoginRequestDTO;
import br.com.gymfy.DTO.TokenResponseDTO;
import br.com.gymfy.entities.Usuario;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    public TokenResponseDTO realizarLogin(LoginRequestDTO loginDTO) {

        var usernamePassword = new UsernamePasswordAuthenticationToken(
                loginDTO.getEmail(),
                loginDTO.getSenha()
        );


        Authentication auth = this.authenticationManager.authenticate(usernamePassword);


        Usuario usuarioAutenticado = (Usuario) auth.getPrincipal();

        String token = tokenService.gerarToken(usuarioAutenticado);


        return new TokenResponseDTO(token, usuarioAutenticado.getTipo(),usuarioAutenticado.getNome());
    }
}