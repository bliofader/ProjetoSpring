package br.com.gymfy.resources;

//import br.com.gymfy.entities.Exercicio;
import br.com.gymfy.entities.Lista;
import br.com.gymfy.entities.Usuario;
import br.com.gymfy.services.ListaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value="/listas")
public class ListaResource {
    @Autowired
    private ListaService listaService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Lista> findById(@PathVariable Integer id) {
        Lista lista = listaService.findById(id);
        return ResponseEntity.ok().body(lista);

    }

    @GetMapping(value = "/dia/{dia}")
    public ResponseEntity<List<Lista>> findByDia(@PathVariable String dia) {
        List<Lista> listas = listaService.findByDia(dia);
        return ResponseEntity.ok().body(listas);
    }



    // Listar todos
    @GetMapping
    public List<Lista> findAll() {
        List<Lista> listas = listaService.findAll();
        return listas;
    }

    @PostMapping
    public ResponseEntity<Lista> cadastrarExecicio(
            @RequestBody Lista lista){
        lista = listaService.cadastrarLista(lista);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(lista.getId()).toUri();
        return ResponseEntity.created(uri).body(lista);
    }

    //deletar
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Lista> deletar(@PathVariable Integer id){
        listaService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    //atualizar
    @PutMapping(value = "/{id}")
    public ResponseEntity<Lista> update(@PathVariable Integer id, @RequestBody Lista lista){
        Lista alterado = listaService.update(id, lista);
        return ResponseEntity.ok().body(alterado);
    }
}
