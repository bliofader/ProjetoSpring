package br.com.gymfy.repositories;

import br.com.gymfy.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {


    Optional<Usuario> findByNome(String nome);
    Optional<Usuario> findByCpf(String cpf);
}
