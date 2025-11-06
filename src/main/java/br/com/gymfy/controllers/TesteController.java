package br.com.gymfy.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/teste")
public class TesteController {

    @GetMapping
    public String testarConexao() {
        return "Conexão entre Angular e Spring Boot (8092) EFETUADA com sucesso!";
    }
}