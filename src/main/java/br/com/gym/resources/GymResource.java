package br.com.gym.resources;

import br.com.gym.Entidade.Usuario;
import br.com.gym.services.GymService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/faculdade")
public class GymResource {
    @Autowired
    private GymService gymService;

    //Pesquisa por RA
    @GetMapping(value = "/{ra}")
    public ResponseEntity<Usuario> findById(@PathVariable Integer ra){
        Usuario usuario = gymService.findById(ra);
        return ResponseEntity.ok().body(usuario);
    }

    //Listar todos as informações
    @GetMapping
    public List<Usuario> findAll(){
        List<Usuario> usuario = gymService.findAll();
        return usuario;
    }
    @GetMapping(value = "/nome/{nome}")
    public ResponseEntity<Usuario> findByNome(@PathVariable String nome){
        Usuario usuario = gymService.findByNome(nome);
        return ResponseEntity.ok().body(usuario);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Usuario> update(@PathVariable Integer id,
    @RequestBody Usuario usuario){
        Usuario alterado = gymService.update(id,usuario);
        return ResponseEntity.ok().body(usuario);
    }

    @DeleteMapping(value = "/{ra}")
    public ResponseEntity<Void> deletar(@PathVariable Integer ra) {
        gymService.deletar(ra);
        return ResponseEntity.noContent().build();
    }




}

