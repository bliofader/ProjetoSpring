package br.com.gymfy.resources;

import br.com.gymfy.services.PersonalService;
import br.com.gymfy.entities.Personal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/personais")
public class PersonalResource {

    @Autowired
    private PersonalService personalService;

    // Buscar personal por ID
    @GetMapping(value = "/{id}")
    public ResponseEntity<Personal> findById(@PathVariable Integer id) {
        Personal personal = personalService.findById(id);
        return ResponseEntity.ok().body(personal);
    }

    // Listar todos os personais
    @GetMapping
    public ResponseEntity<List<Personal>> findAll() {
        List<Personal> personais = personalService.findAll();
        return ResponseEntity.ok().body(personais);
    }

    // Cadastrar novo personal
    @PostMapping
    public ResponseEntity<Personal> cadastrarPersonal(@RequestBody Personal personal) {
        personal = personalService.cadastrarPersonal(personal);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(personal.getId()).toUri();
        return ResponseEntity.created(uri).body(personal);
    }

    // Deletar personal
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        personalService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    // Atualizar personal
    @PutMapping(value = "/{id}")
    public ResponseEntity<Personal> update(@PathVariable Integer id, @RequestBody Personal personal) {
        Personal alterado = personalService.update(id, personal);
        return ResponseEntity.ok().body(alterado);
    }
}
