package br.com.gymfy.services;

import br.com.gymfy.DTO.LoginRequestDTO;
import br.com.gymfy.DTO.TokenResponseDTO;
import br.com.gymfy.entities.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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

        // ✅ Log para garantir que o perfil está correto
        System.out.println("🔍 Login realizado:");
        System.out.println("Usuário: " + usuarioAutenticado.getEmail());
        System.out.println("Perfil: " + usuarioAutenticado.getTipo());
        System.out.println("Nome: " + usuarioAutenticado.getNome());

        // ✅ Usando setters para garantir atribuição correta
        TokenResponseDTO response = new TokenResponseDTO();
        response.setToken(token);
        response.setTipo("Bearer");
        response.setNomeUsuario(usuarioAutenticado.getNome());
        response.setPerfil(usuarioAutenticado.getTipo()); // ← perfil correto
        response.setUsuarioId(usuarioAutenticado.getId().longValue());

        // ✅ Log final da resposta
        System.out.println("🔁 TokenResponseDTO:");
        System.out.println("Token: " + response.getToken());
        System.out.println("Tipo: " + response.getTipo());
        System.out.println("Nome: " + response.getNomeUsuario());
        System.out.println("Perfil: " + response.getPerfil());
        System.out.println("ID: " + response.getUsuarioId());

        return response;
    }
}
