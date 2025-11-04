package br.com.gymfy.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

public class SecurityConfig {

    @Autowired
    private UsuarioDetailsService usuarioDetailsService;

}
