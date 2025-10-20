package br.com.gymfy.services;


import br.com.gymfy.entities.Exercicio;
import br.com.gymfy.entities.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.gymfy.repositories.UsuarioRepository;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    UsuarioRepository usuarioRepository;

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
        return usuarioRepository.save(usuario);
    }

    public void deletar(Integer id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario update (Integer id, Usuario usuario){
        Usuario alterado = findById(id);
        if(alterado!=null){
            alterado.setNome(usuario.getNome());
            alterado.setEmail(usuario.getEmail());
            alterado.setCpf(usuario.getCpf());
            alterado.setDataNascimento(usuario.getDataNascimento());

            return usuarioRepository.save(alterado);
        }
        return null;
    }
}


