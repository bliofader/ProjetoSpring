package br.com.gymfy.resources;

import br.com.gymfy.entities.Exercicio;
import br.com.gymfy.services.UsuarioService;
import br.com.gymfy.entities.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value="/usuarios")
public class UsuarioResource {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Usuario> findById(@PathVariable Integer id) {
        Usuario usuario = usuarioService.findById(id);
        return ResponseEntity.ok().body(usuario);

    }

    @GetMapping(value = "/tipo/{tipo}")
    public ResponseEntity<List<Usuario>> findByTipo(@PathVariable String tipo) {
        List<Usuario> usuarios = usuarioService.findByTipo(tipo);
        return ResponseEntity.ok().body(usuarios);
    }

    // Listar todos
    @GetMapping
    public List<Usuario> findAll() {
        List<Usuario> usuarios = usuarioService.findAll();
        return usuarios;
    }


    @PostMapping
    public ResponseEntity<Usuario> CadastrarUsuario(
            @RequestBody Usuario usuario){
        usuario = usuarioService.cadastrarUsuario(usuario);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(usuario.getId()).toUri();
        return ResponseEntity.created(uri).body(usuario);
    }

    //deletar
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Usuario> deletar(@PathVariable Integer id){
        usuarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Usuario> update(@PathVariable Integer id, @RequestBody Usuario usuario){
        Usuario alterado = usuarioService.update(id,usuario);
        return ResponseEntity.ok().body(alterado);
    }
}
