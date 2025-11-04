package br.com.gymfy.resources;


import br.com.gymfy.entities.Exercicio;
import br.com.gymfy.services.ExercicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value="/exercicios")
public class ExercicioResource {
    @Autowired
    private ExercicioService exercicioService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Exercicio> findById(@PathVariable Integer id) {
        Exercicio exercicio = exercicioService.findById(id);
        return ResponseEntity.ok().body(exercicio);
    }

    @GetMapping(value = "/tipo/{tipo}")
    public ResponseEntity<List<Exercicio>> findByTipo(@PathVariable String tipo) {
        List<Exercicio> exercicios = exercicioService.findByTipo(tipo);
        return ResponseEntity.ok().body(exercicios);
    }


    @PostMapping
    public ResponseEntity<Exercicio> cadastrarExercicio(
            @RequestParam("file") MultipartFile file,
            @RequestParam("nome") String nome,
            @RequestParam("tipo") String tipo,
            @RequestParam("agrupamento") String agrupamento,
            @RequestParam("nivel") String nivel,
            @RequestParam("descricao") String descricao,
            @RequestParam("videoUrl") String videoUrl) {

        String folder = "uploads/";
        String filePath = folder + file.getOriginalFilename();
        try {
            file.transferTo(new File(filePath));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/" + filePath)
                .toUriString();

        Exercicio exercicio = new Exercicio(nome, tipo, agrupamento, nivel, descricao, fileUrl, videoUrl);
        exercicio = exercicioService.CadastrarExecicio(exercicio);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(exercicio.getId()).toUri();
        return ResponseEntity.created(uri).body(exercicio);
    }

    // Listar todos
    @GetMapping
    public List<Exercicio> findAll() {
        return exercicioService.findAll();
    }

    // Deletar exercício
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Exercicio> deletar(@PathVariable Integer id){
        exercicioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
