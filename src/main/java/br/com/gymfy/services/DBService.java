package br.com.gymfy.services;


import br.com.gymfy.repositories.UsuarioRepository;
import br.com.gymfy.entities.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;

@Service
public class DBService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Bean
    public String instanciarDB() throws ParseException, ParseException {
        SimpleDateFormat formato = new SimpleDateFormat("dd/MM/yyyy");
        Usuario usuario1 = new Usuario("kauã diodato", "Comum", formato.parse("21/10/2004"), "491.064.038-90", "kauadiodato@outlook.com", "teste123");
        usuarioRepository.saveAll(Arrays.asList(usuario1));
        return "";
    }
}

