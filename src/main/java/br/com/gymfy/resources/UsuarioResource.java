package br.com.gymfy.resources;


import br.com.gymfy.DTO.UsuarioCadastroDTO;
import br.com.gymfy.DTO.UsuarioResponseDTO;
import br.com.gymfy.DTO.UsuarioUpdateDTO;
import br.com.gymfy.services.UsuarioService;
import br.com.gymfy.entities.Usuario;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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



    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> findAll() {

        List<Usuario> usuarios = usuarioService.findAll();

        List<UsuarioResponseDTO> dtos = usuarios.stream()
                .map(u -> new UsuarioResponseDTO(u.getNome(), u.getTipo()))
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/linkados")
    public ResponseEntity<List<UsuarioResponseDTO>> listarComPersonal() {

        // 1. Busca usuários linkados (apenas aqueles com personal_id preenchido)
        List<Usuario> usuariosLinkados = usuarioService.listarAlunosComPersonal();

        List<UsuarioResponseDTO> dtos = usuariosLinkados.stream()
                .map(u -> new UsuarioResponseDTO(u.getNome(), u.getTipo()))
                .toList();

        return ResponseEntity.ok(dtos);
    }


    @PostMapping("/cadastro")
    public ResponseEntity<Usuario> CadastrarUsuario(
            @RequestBody @Valid UsuarioCadastroDTO cadastroDTO){

        Usuario usuarioCadastrado = usuarioService.cadastrarUsuario(cadastroDTO);


        usuarioCadastrado.setSenha(null);


        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(usuarioCadastrado.getId()).toUri();
        return ResponseEntity.created(uri).body(usuarioCadastrado);
    }

    //deletar
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Usuario> deletar(@PathVariable Integer id){
        usuarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Usuario> update(@PathVariable Integer id,
                                          @RequestBody @Valid UsuarioUpdateDTO updateDTO){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String emailLogado = authentication.getName();

        Usuario usuarioLogado = usuarioService.findByEmail(emailLogado);


        if (!usuarioLogado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }


        Usuario alterado = usuarioService.update(id, updateDTO);

        if(alterado != null){
            alterado.setSenha(null);
            return ResponseEntity.ok().body(alterado);
        }
        return ResponseEntity.notFound().build();
    }
}
