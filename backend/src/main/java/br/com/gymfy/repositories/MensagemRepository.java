package br.com.gymfy.repositories;

import br.com.gymfy.entities.Mensagem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MensagemRepository extends JpaRepository<Mensagem, Long> {
    // Mensagens recebidas por um personal
    List<Mensagem> findByIdPersonalOrderByDataEnvioDesc(Long idPersonal);

    // Mensagens enviadas por um usuário comum
    List<Mensagem> findByIdUsuarioOrderByDataEnvioDesc(Long idUsuario);
}
