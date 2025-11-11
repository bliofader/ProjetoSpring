package br.com.gymfy.services;


import br.com.gymfy.entities.Exercicio;
import br.com.gymfy.entities.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import br.com.gymfy.repositories.UsuarioRepository;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario findById(Integer id) {
        Optional<Usuario> usuario= usuarioRepository.findById(id);
        return usuario.orElse(null);
    }



    public List<Usuario> findAll(){
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios;

    }

    public Usuario findByNome(String nome){
        Optional<Usuario> usuarios = usuarioRepository.findByNome(nome);
        return usuarios.orElse(null);

    }

    public List<Usuario> findByTipo(String tipo) {
        return usuarioRepository.findByTipo(tipo);
    }

    public Usuario findByCpf(String cpf){
        Optional<Usuario> usuarios = usuarioRepository.findByCpf(cpf);
        return usuarios.orElse(null);
    }


    public Usuario cadastrarUsuario(Usuario usuario){
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha())); // ✅ Criptografando
        return usuarioRepository.save(usuario);
    }

    public void deletar(Integer id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        if (usuario.isPresent()) {
            usuarioRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário com ID " + id + " não encontrado.");
        }
    }

    public Usuario update(Integer id, Usuario usuario) {
        Usuario alterado = findById(id);
        if (alterado != null) {
            Optional<Usuario> existente = usuarioRepository.findByEmail(usuario.getEmail());
            if (existente.isPresent() && !existente.get().getId().equals(id)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "E-mail já está em uso por outro usuário.");
            }

            alterado.setNome(usuario.getNome());
            alterado.setEmail(usuario.getEmail());
            alterado.setDataNascimento(usuario.getDataNascimento());
            alterado.setTipo(usuario.getTipo());
            alterado.setSenha(passwordEncoder.encode(usuario.getSenha()));

            return usuarioRepository.save(alterado);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário com ID " + id + " não encontrado.");
    }


}


