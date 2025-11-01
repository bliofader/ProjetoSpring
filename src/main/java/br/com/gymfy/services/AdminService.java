package br.com.gymfy.services;

import br.com.gymfy.DTO.LinkagemRequestDTO;
import br.com.gymfy.entities.Usuario;
import br.com.gymfy.entities.Personal;
import br.com.gymfy.repositories.UsuarioRepository;
import br.com.gymfy.repositories.PersonalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PersonalRepository personalRepository;

    public Usuario linkarPersonalAUsuario(LinkagemRequestDTO linkagemDTO) {

        Usuario usuario = usuarioRepository.findById(linkagemDTO.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário (Aluno) não encontrado."));

        Personal personal = personalRepository.findById(linkagemDTO.getPersonalId())
                .orElseThrow(() -> new RuntimeException("Personal Trainer não encontrado."));

        usuario.setPersonal(personal);

        return usuarioRepository.save(usuario);
    }
}