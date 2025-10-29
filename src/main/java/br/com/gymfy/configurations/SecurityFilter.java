package br.com.gymfy.configurations;


import br.com.gymfy.repositories.UsuarioRepository;
import br.com.gymfy.services.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    TokenService tokenService;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = this.recuperarToken(request);

        if(token != null ){
             String login = tokenService.validarToken(token);

            System.out.println("--- LOG: Tentando autenticar email: " + login + " ---");

             if(login != null){
                 UserDetails user =  usuarioRepository.findByEmail(login).orElse(null);

                 if (user != null){
                     var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                     SecurityContextHolder.getContext().setAuthentication(authentication);
                 }

             }

        }

        filterChain.doFilter(request, response);


    }

    private String recuperarToken (HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null) return null;


        if (authHeader.startsWith("Bearer ")) {


            return authHeader.replace("Bearer ", "");
        }
        return null;
    }


}
