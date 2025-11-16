package br.com.gymfy.services;

import br.com.gymfy.entities.Mensagem;
import br.com.gymfy.repositories.MensagemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MensagemService {

    private final MensagemRepository mensagemRepository;

    public MensagemService(MensagemRepository mensagemRepository) {
        this.mensagemRepository = mensagemRepository;
    }

    // ✅ Enviar mensagem
    public Mensagem enviarMensagem(Mensagem mensagem) {
        return mensagemRepository.save(mensagem);
    }

    // ✅ Listar mensagens de um personal
    public List<Mensagem> listarMensagensDoPersonal(Long idPersonal) {
        return mensagemRepository.findByIdPersonalOrderByDataEnvioDesc(idPersonal);
    }

    // ✅ Listar mensagens de um usuário comum
    public List<Mensagem> listarMensagensDoUsuario(Long idUsuario) {
        return mensagemRepository.findByIdUsuarioOrderByDataEnvioDesc(idUsuario);
    }
}
