package br.com.gymfy.services;


import br.com.gymfy.entities.Exercicio;
import br.com.gymfy.entities.Personal;
import br.com.gymfy.repositories.ExercicioRepository;
import br.com.gymfy.repositories.PersonalRepository;
import br.com.gymfy.repositories.UsuarioRepository;
import br.com.gymfy.entities.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder; // NOVO IMPORT

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;

@Service
public class DBService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ExercicioRepository exercicioRepository;
    @Autowired
    private PersonalRepository personalRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public String instanciarDB() throws ParseException {
        SimpleDateFormat formato = new SimpleDateFormat("dd/MM/yyyy");

        String hash123 = passwordEncoder.encode("teste123");
        String hash12345 = passwordEncoder.encode("teste12345");

        Usuario usuario1 = new Usuario("kauã diodato", "Comum", formato.parse("21/10/2004"), "491.064.038-90", "kauadiodato@outlook.com.br", hash123);
        Usuario usuario2 = new Usuario("kauã diodato2", "Admin", formato.parse("21/10/2004"), "491.064.038-90", "kauadiodato@outlook.com", hash123);
        usuarioRepository.saveAll(Arrays.asList(usuario1,usuario2));

        Exercicio exercicio = new Exercicio("Costas1","costas","Costas","avançado","asjdiasndnas");
        Exercicio exercicio2 = new Exercicio("peito","peito","peito","avançado","asjdiasndnas");
        Exercicio exercicio3 = new Exercicio("Costas2","costas","Costas","avançado","asjdiasndnas");
        exercicioRepository.saveAll(Arrays.asList(exercicio,exercicio2,exercicio3));

        Personal personal = new Personal("Kauã","Personal",formato.parse("24/10/2003"),"49103302190","personalkauadiodato@outlook.com", hash12345, "Musculação","saidjsajid","hsahdsjadojsaoj");
        personalRepository.saveAll(Arrays.asList(personal));

        return "Banco de dados instanciado com sucesso!";
    }
}