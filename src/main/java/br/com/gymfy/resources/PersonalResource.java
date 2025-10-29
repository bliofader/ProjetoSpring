package br.com.gymfy.resources;

import br.com.gymfy.DTO.PersonalCadastroDTO; // NOVO IMPORT: DTO de entrada
import br.com.gymfy.services.PersonalService;
import br.com.gymfy.entities.Personal;
import jakarta.validation.Valid; // Necessário para validar o DTO
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
    private PersonalService personalService;


    @GetMapping(value = "/{id}")
    public ResponseEntity<Personal> findById(@PathVariable Integer id) {
        Personal personal = personalService.findById(id);
        if (personal != null) {
            personal.setSenha(null); // LIMPEZA DA SENHA
        }
        return ResponseEntity.ok().body(personal);
    }

    @GetMapping
    public List<Personal> findAll() {
        List<Personal> personais = personalService.findAll();
        personais.forEach(p -> p.setSenha(null));
        return personais;
    }


    @PostMapping
    public ResponseEntity<Personal> cadastrarPersonal(
            @RequestBody @Valid PersonalCadastroDTO cadastroDTO){

        Personal personal = personalService.cadastrarPersonal(cadastroDTO);

        personal.setSenha(null);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(personal.getId()).toUri();

        return ResponseEntity.created(uri).body(personal);
    }


    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Personal> deletar(@PathVariable Integer id){
        personalService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Personal> update(@PathVariable Integer id, @RequestBody Personal personal){
        Personal alterado = personalService.update(id,personal);

        if (alterado != null) {
            alterado.setSenha(null); // LIMPEZA DA SENHA
        }
        return ResponseEntity.ok().body(alterado);
    }
}