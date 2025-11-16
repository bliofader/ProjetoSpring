package br.com.gymfy.resources;

import br.com.gymfy.entities.Mensagem;
import br.com.gymfy.services.MensagemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/mensagens")
public class MensagemResource {

    private final MensagemService mensagemService;

    public MensagemResource(MensagemService mensagemService) {
        this.mensagemService = mensagemService;
    }

    // ✅ Enviar mensagem
    @PostMapping
    public ResponseEntity<Mensagem> enviarMensagem(@RequestBody Mensagem mensagem) {
        Mensagem novaMensagem = mensagemService.enviarMensagem(mensagem);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(novaMensagem.getId()).toUri();
        return ResponseEntity.created(uri).body(novaMensagem);
    }

    // ✅ Listar mensagens de um personal
    @GetMapping("/personal/{idPersonal}")
    public ResponseEntity<List<Mensagem>> listarMensagensDoPersonal(@PathVariable Long idPersonal) {
        List<Mensagem> mensagens = mensagemService.listarMensagensDoPersonal(idPersonal);
        return ResponseEntity.ok().body(mensagens);
    }

    // ✅ Listar mensagens de um usuário comum
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Mensagem>> listarMensagensDoUsuario(@PathVariable Long idUsuario) {
        List<Mensagem> mensagens = mensagemService.listarMensagensDoUsuario(idUsuario);
        return ResponseEntity.ok().body(mensagens);
    }
}
