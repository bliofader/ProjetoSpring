package br.com.gymfy.services;


import br.com.gymfy.entities.Exercicio;
import br.com.gymfy.entities.Lista;
import br.com.gymfy.entities.Personal;
import br.com.gymfy.repositories.*;
import br.com.gymfy.entities.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
    private ListaRepository listaRepository;
    @Autowired
    private ProdutoRepository produtoRepository;
    @Autowired
    private PasswordEncoder passwordEncoder; // ✅ Adicionado

    @Bean
    public String instanciarDB() throws ParseException {
        SimpleDateFormat formato = new SimpleDateFormat("dd/MM/yyyy");

        Usuario usuario1 = new Usuario(
                "kauã diodato", "Comum", formato.parse("21/10/2004"),
                "491.064.038-90", "kauadiodato@outlook.com",
                passwordEncoder.encode("teste123"),"" // ✅ Criptografado
        );

        Usuario usuario2 = new Usuario(
                "kauã diodato2", "Admin", formato.parse("21/10/2004"),
                "491.064.038-90", "kauadiodato2@outlook.com",
                passwordEncoder.encode("teste123"),"" // ✅ Criptografado
        );

        usuarioRepository.saveAll(Arrays.asList(usuario1, usuario2));

        // Exercícios e personal continuam iguais
        Exercicio exercicio = new Exercicio("Costas1", "costas", "Costas", "avançado", "exercicio para costas", "", "");
        Exercicio exercicio2 = new Exercicio("peito", "peito", "peito", "avançado", "asjdiasndnas", "", "");
        Exercicio exercicio3 = new Exercicio("Costas2", "costas", "Costas", "avançado", "asjdiasndnas", "", "");
        exercicioRepository.saveAll(Arrays.asList(exercicio, exercicio2, exercicio3));

        Personal personal = new Personal(
                "Kauã", "Personal", formato.parse("24/10/2003"),
                "49103302190", "personalkauadiodato@outlook.com",
                passwordEncoder.encode("teste12345"), // ✅ Criptografado
                "Musculação", "saidjsajid", "hsahdsjadojsaoj",""
        );
        personalRepository.saveAll(Arrays.asList(personal));

        return "";
    }
}
