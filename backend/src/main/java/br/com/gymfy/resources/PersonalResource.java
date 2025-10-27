package br.com.gymfy.resources;


import br.com.gymfy.services.PersonalService;
import br.com.gymfy.entities.Personal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;



@RestController
@RequestMapping(value="/personais")
public class PersonalResource {

    @Autowired
    private PersonalService personalservice;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Personal> findById(@PathVariable Integer id) {
        Personal personal = personalservice.findById(id);
        return ResponseEntity.ok().body(personal);
    }

    @GetMapping
    public List<Personal> findAll() {
        List<Personal> personais = personalservice.findAll();
        return personais;
    }

    @PostMapping
    public ResponseEntity<Personal> PersonalUsuario(
            @RequestBody Personal personal){
        personal = personalservice.cadastrarPersonal(personal);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(personal.getId()).toUri();
        return ResponseEntity.created(uri).body(personal);
    }

    //deletar
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Personal> deletar(@PathVariable Integer id){
        personalservice.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Personal> update(@PathVariable Integer id, @RequestBody Personal personal){
        Personal alterado = personalservice.update(id,personal);
        return ResponseEntity.ok().body(alterado);
    }

}
