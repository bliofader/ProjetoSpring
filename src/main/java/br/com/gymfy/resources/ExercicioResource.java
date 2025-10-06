package br.com.gymfy.resources;


import br.com.gymfy.entities.Exercicio;
import br.com.gymfy.services.ExercicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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



    // Listar todos
    @GetMapping
    public List<Exercicio> findAll() {
        List<Exercicio> exercicios = exercicioService.findAll();
        return exercicios;
    }

    @PostMapping
    public ResponseEntity<Exercicio> cadastrarExecicio(
            @RequestBody Exercicio exercicio){
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
