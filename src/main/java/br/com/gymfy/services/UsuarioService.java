package br.com.gymfy.services;


import br.com.gymfy.DTO.UsuarioUpdateDTO;
import br.com.gymfy.entities.Exercicio;
import br.com.gymfy.entities.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import br.com.gymfy.repositories.UsuarioRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import br.com.gymfy.DTO.UsuarioCadastroDTO;

@Service
public class UsuarioService {
    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario findById(Integer id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return usuario.orElse(null);
    }


    public List<Usuario> findAll() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios;

    }

    public Usuario findByNome(String nome) {
        Optional<Usuario> usuarios = usuarioRepository.findByNome(nome);
        return usuarios.orElse(null);

    }

    public List<Usuario> findByTipo(String tipo) {
        return usuarioRepository.findByTipo(tipo);
    }

    public Usuario findByCpf(String cpf) {
        Optional<Usuario> usuarios = usuarioRepository.findByCpf(cpf);
        return usuarios.orElse(null);
    }

    public Usuario findByEmail(String email) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        return usuario.orElse(null);
    }

    public Usuario cadastrarUsuario(UsuarioCadastroDTO cadastroDTO) {

        if (usuarioRepository.findByEmail(cadastroDTO.getEmail()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado.");
        }

        Usuario novoUsuario = new Usuario();

        novoUsuario.setNome(cadastroDTO.getNome());
        novoUsuario.setSobrenome(cadastroDTO.getSobrenome());
        novoUsuario.setCep(cadastroDTO.getCep());
        novoUsuario.setEmail(cadastroDTO.getEmail());
        novoUsuario.setCpf(cadastroDTO.getCpf());

        try {

            SimpleDateFormat formatador = new SimpleDateFormat("yyyy-MM-dd");
            Date dataConvertida = formatador.parse(cadastroDTO.getDataNascimento());
            novoUsuario.setDataNascimento(dataConvertida);

        } catch (ParseException e) {
            throw new RuntimeException("Formato de Data de Nascimento inválido. Use YYYY-MM-DD.", e);
        }
        // -----

        String senhaCriptografada = passwordEncoder.encode(cadastroDTO.getSenha());
        novoUsuario.setSenha(senhaCriptografada);

        novoUsuario.setTipo("COMUM");

        return usuarioRepository.save(novoUsuario);
    }


    public void deletar(Integer id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario update(Integer id, UsuarioUpdateDTO updateDTO) {
        Usuario alterado = findById(id);

        if (alterado != null) {

            alterado.setNome(updateDTO.getNome());
            alterado.setSobrenome(updateDTO.getSobrenome());
            alterado.setCep(updateDTO.getCep());
            alterado.setCpf(updateDTO.getCpf());

            if (updateDTO.getDataNascimento() != null && !updateDTO.getDataNascimento().isBlank()) {
                try {
                    SimpleDateFormat formatador = new SimpleDateFormat("yyyy-MM-dd");
                    Date dataConvertida = formatador.parse(updateDTO.getDataNascimento());
                    alterado.setDataNascimento(dataConvertida);
                } catch (ParseException e) {
                    throw new RuntimeException("Formato de Data de Nascimento inválido. Use YYYY-MM-DD.", e);
                }
            }


            return usuarioRepository.save(alterado);
        }
        return null;
    }
}
