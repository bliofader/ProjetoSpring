package br.com.gymfy.resources;

import br.com.gymfy.DTO.UsuarioCadastroDTO;
import br.com.gymfy.DTO.UsuarioDadosDTO;
import br.com.gymfy.DTO.UsuarioResponseDTO;
import br.com.gymfy.DTO.UsuarioUpdateDTO;
import br.com.gymfy.entities.Usuario;
import br.com.gymfy.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/usuarios")
public class UsuarioResource {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<UsuarioResponseDTO> findById(@PathVariable Integer id) {
        Usuario usuario = usuarioService.findById(id);
        return ResponseEntity.ok().body(new UsuarioResponseDTO(usuario));
    }

    @GetMapping(value = "/tipo/{tipo}")
    public ResponseEntity<List<UsuarioResponseDTO>> findByTipo(@PathVariable String tipo) {
        List<UsuarioResponseDTO> usuarios = usuarioService.findByTipo(tipo)
                .stream().map(UsuarioResponseDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok().body(usuarios);
    }

    @GetMapping
    public List<UsuarioResponseDTO> findAll() {
        return usuarioService.findAll()
                .stream().map(UsuarioResponseDTO::new).collect(Collectors.toList());
    }

    @GetMapping(value = "/personais")
    public ResponseEntity<List<UsuarioResponseDTO>> listarPersonais() {
        List<UsuarioResponseDTO> personais = usuarioService.findByTipo("Personal")
                .stream().map(UsuarioResponseDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok().body(personais);
    }

    @GetMapping(value = "/personais/{id}")
    public ResponseEntity<UsuarioResponseDTO> buscarPersonalPorId(@PathVariable Integer id) {
        Usuario usuario = usuarioService.findById(id);
        if (!"Personal".equalsIgnoreCase(usuario.getTipo())) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(new UsuarioResponseDTO(usuario));
    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UsuarioResponseDTO> cadastrarUsuarioComImagem(
            @RequestPart("usuario") @Valid UsuarioCadastroDTO dto,
            @RequestPart(value = "imagem", required = false) MultipartFile imagem) {

        Usuario novo = usuarioService.cadastrarUsuario(dto, imagem);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(novo.getId()).toUri();
        return ResponseEntity.created(uri).body(new UsuarioResponseDTO(novo));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UsuarioResponseDTO> updateComImagem(
            @PathVariable Integer id,
            @RequestPart("usuario") @Valid UsuarioUpdateDTO dto,
            @RequestPart(value = "imagem", required = false) MultipartFile imagem) {

        Usuario alterado = usuarioService.updateComImagem(id, dto, imagem);
        return ResponseEntity.ok().body(new UsuarioResponseDTO(alterado));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizarDados(
            @PathVariable Integer id, // Usando Integer para consistência com outros métodos
            @Valid @RequestBody UsuarioDadosDTO dto
    ) {
        usuarioService.atualizarDados(id, dto);
        return ResponseEntity.ok("Dados do Usuário " + id + " atualizados com sucesso!");
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deletar(@PathVariable Integer id) {
        usuarioService.deletar(id);
        return ResponseEntity.ok("Usuário com ID " + id + " deletado com sucesso.");
    }
}