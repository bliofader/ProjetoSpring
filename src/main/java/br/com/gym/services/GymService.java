package br.com.gym.services;
import java.util.List;
import java.util.Optional;
import br.com.gym.repositories.UsuarioRepository;
import br.com.gym.Entidade.Usuario;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

@Service
public class GymService {

        @Autowired
        static UsuarioRepository usuarioRepository;

        //Pesquisa por RA
        public static Usuario findById(Integer id) {
            Optional<Usuario> usuario = usuarioRepository.findById(id);
            return usuario.orElse(null);
        }

        public List<Usuario> findAll() {
            List<Usuario> usuarios = usuarioRepository.findAll();
            return usuarios;
        }

        public Usuario cadastrarUsuario(Usuario usuario) {
            return usuarioRepository.save(usuario);
        }

        public Usuario findByNome(String nome) {
            Optional<Usuario> usuario = usuarioRepository.findByNome(nome);
            return usuario.orElse(null);
        }



        public Usuario update(Integer id, Usuario usuario){
            Usuario alterado = findById(id);
            if(alterado!=null){
                alterado.setNome(usuario.getNome());
                alterado.setTipo(usuario.getTipo());
                alterado.setDataNascimento(usuario.getDataNascimento());
                alterado.setCpf(usuario.getCpf());
                alterado.setEmail(usuario.getEmail());
                alterado.setSenha(usuario.getSenha());

                return usuarioRepository.save(alterado);

            }


            return null;
        }
    public void deletar(Integer ra) {
        usuarioRepository.deleteById(ra);
    }
}



