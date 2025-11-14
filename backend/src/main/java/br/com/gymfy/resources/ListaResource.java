package br.com.gymfy.resources;

import br.com.gymfy.DTO.ListaDTO;
import br.com.gymfy.DTO.ListaResponseDTO;
import br.com.gymfy.services.ListaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200") // permite chamadas do Angular
@RestController
@RequestMapping(value="/listas")
public class ListaResource {

    @Autowired
    private ListaService listaService;

    // ✅ Buscar lista por ID (retorna DTO com exercícios)
    @GetMapping(value = "/{id}")
    public ResponseEntity<ListaResponseDTO> findById(@PathVariable Integer id) {
        ListaResponseDTO lista = listaService.findById(id);
        return ResponseEntity.ok().body(lista);
    }

    // ✅ Listar todas as listas (retorna DTOs)
    @GetMapping
    public ResponseEntity<List<ListaResponseDTO>> findAll() {
        List<ListaResponseDTO> listas = listaService.findAll();
        return ResponseEntity.ok().body(listas);
    }

    // ✅ Criar nova lista (retorna DTO)
    @PostMapping
    public ResponseEntity<ListaResponseDTO> cadastrarLista(@RequestBody ListaDTO dto){
        ListaResponseDTO lista = listaService.cadastrarLista(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(lista.getId()).toUri();
        return ResponseEntity.created(uri).body(lista);
    }

    // ✅ Listar listas por usuário (retorna DTOs)
    @GetMapping(value = "/usuario/{id}")
    public ResponseEntity<List<ListaResponseDTO>> findByUsuario(@PathVariable Integer id) {
        List<ListaResponseDTO> listas = listaService.findByUsuario(id);
        return ResponseEntity.ok().body(listas);
    }

    // ✅ Deletar lista
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id){
        listaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
