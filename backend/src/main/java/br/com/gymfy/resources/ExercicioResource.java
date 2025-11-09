package br.com.gymfy.resources;


import br.com.gymfy.entities.Exercicio;
import br.com.gymfy.services.ExercicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")

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








    // Listar todos
    @GetMapping
    public List<Exercicio> findAll() {
        List<Exercicio> exercicios = exercicioService.findAll();
        return exercicios;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Exercicio> cadastrarExercicio(
            @RequestParam("nome") String nome,
            @RequestParam("tipo") String tipo,
            @RequestParam("agrupamento") String agrupamento,
            @RequestParam("nivel") String nivel,
            @RequestParam("descricao") String descricao,
            @RequestParam(value = "videoUrl", required = false) String videoUrl,
            @RequestParam("imagem") MultipartFile imagem
    ) throws IOException {

        // Gerar nome único para a imagem
        String fileName = UUID.randomUUID() + "_" + imagem.getOriginalFilename();

        // Caminho onde a imagem será salva
        Path imagePath = Paths.get("uploads/" + fileName);
        Files.createDirectories(imagePath.getParent());
        Files.write(imagePath, imagem.getBytes());

        Exercicio exercicio = new Exercicio();
        exercicio.setNome(nome);
        exercicio.setTipo(tipo);
        exercicio.setAgrupamento(agrupamento);
        exercicio.setNivel(nivel);
        exercicio.setDescricao(descricao);
        exercicio.setImagePath(fileName);
        exercicio.setVideoPath(videoUrl);

        exercicio = exercicioService.CadastrarExecicio(exercicio);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(exercicio.getId()).toUri();
        return ResponseEntity.created(uri).body(exercicio);
    }



    //deletar
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Exercicio> deletar(@PathVariable Integer id){
        exercicioService.deletar(id);
        return ResponseEntity.noContent().build();
    }


}
